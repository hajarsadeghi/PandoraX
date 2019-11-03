from django.db import models
from utils import raw_query
from django.db.transaction import atomic as transaction_atomic
from django.db.models import F
from transaction.models import Wallet, Source


class Transaction(models.Model):
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    source_user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='spend_transaction')
    dest_user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='earned_transaction')
    total_point_amount = models.PositiveIntegerField()
    applied = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        app_label = 'transaction'

    def apply(self):
        if not self.id or self.applied: return False

        query = f'''
            WITH cte AS (
              SELECT
            		`transaction_wallet`.`id`,
            		`transaction_wallet`.`point_amount`,
            		SUM(`transaction_wallet`.`point_amount`) OVER (ORDER BY type DESC, id) AS `cumsum`
              FROM `transaction_wallet`
            	WHERE
            		(`transaction_wallet`.`space_id` = {self.space.id} AND `transaction_wallet`.`user_id` = {self.source_user.id})
            )
            SELECT
            	id,
            	point_amount,
            	CASE WHEN cumsum >= {self.total_point_amount} THEN (point_amount - (cumsum-{self.total_point_amount})) ELSE point_amount END AS `diff`
            FROM cte
            JOIN (
                select min(cumsum) as first_row
                from cte
                where cumsum >= {self.total_point_amount}
            ) T2
            WHERE cumsum <= `T2`.`first_row`;
        '''
        columns = ['id','point_amount', 'diff']
        source_wallets = raw_query(query, columns=columns)
        if not source_wallets: return False

        with transaction_atomic():
            for source_wallet in source_wallets:
                tmp_wallet = Wallet.objects.get(id=source_wallet['id'])
                tmp_wallet.point_amount = F('point_amount') - source_wallet['diff']
                tmp_wallet.save(update_fields=['point_amount'])
                Source.objects.create(transaction=self, wallet=tmp_wallet, point_amount=source_wallet['diff'])

            dest_earned_wallet = Wallet.objects.get_or_create(user=self.dest_user, space=self.space, type=Wallet.EARNED_TYPE)[0]
            dest_earned_wallet.point_amount = F('point_amount') + self.total_point_amount
            dest_earned_wallet.save(update_fields=['point_amount'])

            self.applied = True
            self.save(update_fields=['applied'])
        return True
