from django.db import models

class BadgeLog(models.Model):
    from_user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='gived_badge')
    to_user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='received_badge')
    badge = models.ForeignKey('badge.Badge', on_delete=models.CASCADE)
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    point_transferred = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        app_label = 'badge'
