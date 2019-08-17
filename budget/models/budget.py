from django.db import models

class Budget(models.Model):
    name = models.CharField(max_length=100)
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    creator = models.ForeignKey('user.User', on_delete=models.CASCADE)
    point_amount = models.PositiveIntegerField()
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        app_label = 'budget'
