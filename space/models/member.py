from django.db import models

class Member(models.Model):
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)

    class Meta:
        app_label = 'space'
