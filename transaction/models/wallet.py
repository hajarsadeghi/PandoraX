from django.db import models
from django.db.models import Window, F
from django.db.models.functions import RowNumber
from utils import user_serializer


class WalletManager(models.Manager):
    def get_leaderboard(self, space, limit=10):
        queryset = []
        rank_window_function = Window(expression=RowNumber(), order_by=F('point_amount').desc())
        other_ranks = super(WalletManager, self).filter(space=space, type=Wallet.EARNED_TYPE).annotate(rank=rank_window_function).values(
            'rank',
            'user__id',
            'user__first_name',
            'user__last_name',
            'user__profile_picture',
            'point_amount'
        ).order_by('rank')[:limit]
        for rank in other_ranks:
            tmp_rank = user_serializer(
                rank['user__id'],
                space,
                rank['user__first_name'],
                rank['user__last_name'],
                rank['user__profile_picture'],
            )
            tmp_rank['rank'] = rank['rank']
            tmp_rank['point_amount'] = rank['point_amount']
            queryset.append(tmp_rank)
        return queryset

class Wallet(models.Model):
    EARNED_TYPE = 0
    BUDGET_TYPE = 1
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    type = models.PositiveSmallIntegerField(choices=((EARNED_TYPE, 'Earned'),(BUDGET_TYPE, 'Budget')))
    budget = models.ForeignKey('budget.Budget', on_delete=models.CASCADE, null=True, blank=True)

    point_amount = models.PositiveIntegerField(default=0)
    expire = models.DateTimeField(null=True, blank=True)
    # active = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
    objects = WalletManager()
    class Meta:
        app_label = 'transaction'
