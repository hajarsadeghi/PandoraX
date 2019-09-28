from django.db import models

class Member(models.Model):
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    active = models.BooleanField(default=True)

    budget_point_amount = models.PositiveIntegerField(default=0)
    earned_point_amount = models.PositiveIntegerField(default=0)

    class Meta:
        app_label = 'space'
