from django.db import models

class Badge(models.Model):
    name = models.CharField(max_length=100)
    point_amount = models.PositiveIntegerField()
    icon = models.ForeignKey('badge.Icon', on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    creator = models.ForeignKey('user.User', on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        app_label = 'badge'
