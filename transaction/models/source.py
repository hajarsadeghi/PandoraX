from django.db import models


class Source(models.Model):
    transaction = models.ForeignKey('transaction.Transaction', on_delete=models.CASCADE)
    wallet = models.ForeignKey('transaction.Wallet', on_delete=models.CASCADE)
    point_amount = models.PositiveIntegerField()

    class Meta:
        app_label = 'transaction'
