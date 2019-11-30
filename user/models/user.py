from django.contrib.auth.models import AbstractUser
from django.db import models
from transaction.models import Wallet
from django.db.models import Q, Sum
from datetime import datetime
from utils import raw_query


class User(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    is_username_set = models.BooleanField(default=False)
    bio = models.TextField(null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{'' if not self.first_name else self.first_name} {'' if not self.last_name else self.last_name}".strip()

    @property
    def name_chars(self):
        return f"{self.first_name[0] if self.first_name else ''}{self.last_name[0] if self.last_name else ''}"

    class Meta:
        app_label = 'user'

    def budget_point_amount(self, space):
        tmp_point_amount = Wallet.objects.filter(
                    Q(user=self),
                    Q(space=space),
                    Q(type=Wallet.BUDGET_TYPE),
                    Q(expire=None)|Q(expire__gte=datetime.now())
                ).aggregate(sum=Sum('point_amount'))['sum']
        return tmp_point_amount if tmp_point_amount else 0

    def earned_point_amount(self, space):
        return Wallet.objects.get_or_create(user=self, space=space, type=Wallet.EARNED_TYPE)[0].point_amount


    def can_pay(self, point_amount, space):
        total_point_amount = Wallet.objects.filter(
            Q(user=self),
            Q(space=space),
            Q(expire=None)|Q(expire__gte=datetime.now())
        ).aggregate(sum=Sum('point_amount'))['sum']
        if total_point_amount:
            if total_point_amount >= point_amount: return True
        return False

    def my_rank(self, space):
        query = f'''
            SELECT
            	FIND_IN_SET(
            		`transaction_wallet`.`point_amount`,
            		(
            			SELECT
            			GROUP_CONCAT(`transaction_wallet`.`point_amount` ORDER BY `transaction_wallet`.`point_amount` DESC)
            			FROM `transaction_wallet`
            			WHERE `transaction_wallet`.`type` = 0
            		)
            	) AS `rank`
            FROM
            	`transaction_wallet`
            WHERE
            	`transaction_wallet`.`type` = 0 AND `transaction_wallet`.`space_id` = {space.id} AND `transaction_wallet`.`user_id` = {self.id};
        '''
        result = raw_query(query,['rank'])
        return result[0]['rank'] if result else 0
