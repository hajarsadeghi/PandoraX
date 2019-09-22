from django.db import models

class Icon(models.Model):
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE, null=True, blank=True)
    creator = models.ForeignKey('user.User', on_delete=models.CASCADE, null=True, blank=True)
    is_global = models.BooleanField(default=False)
    image = models.ImageField(upload_to='badge_icons/')
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        app_label = 'badge'
