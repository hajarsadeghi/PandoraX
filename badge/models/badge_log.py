from django.db import models
from transaction.models import Transaction

class BadgeLog(models.Model):
    from_user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='gived_badge')
    to_user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='received_badge')
    badge = models.ForeignKey('badge.Badge', on_delete=models.CASCADE)
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    point_transferred = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        app_label = 'badge'

    def apply(self):
        transaction = Transaction.objects.create(
            space=self.space,
            source_user=self.from_user,
            dest_user=self.to_user,
            total_point_amount=self.badge.point_amount
        )
        transaction.refresh_from_db()
        applied = transaction.apply()
        if applied:
            self.point_transferred = True
            self.save(update_fields=['point_transferred'])
            return True
        return False
