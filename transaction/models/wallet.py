from django.db import models


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

    class Meta:
        app_label = 'transaction'
