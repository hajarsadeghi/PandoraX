from django.db import models
from django.db import transaction
from django.db.models import F
from space.models import Member
from transaction.models import Wallet


class Budget(models.Model):
    name = models.CharField(max_length=100)
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    creator = models.ForeignKey('user.User', on_delete=models.CASCADE)
    point_amount = models.PositiveIntegerField()
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        app_label = 'budget'

    def apply(self):
        queryset = self.space.member_set.all().values_list('user__id', flat=True)
        wallet_list = []
        for user in queryset:
            tmp_wallet = Wallet()
            tmp_wallet.user_id = user
            tmp_wallet.space_id = self.space.id
            tmp_wallet.type = Wallet.BUDGET_TYPE
            tmp_wallet.budget_id = self.id
            tmp_wallet.point_amount = self.point_amount
            tmp_wallet.expire = None
            wallet_list.append(tmp_wallet)
        with transaction.atomic():
            Wallet.objects.bulk_create(wallet_list)
