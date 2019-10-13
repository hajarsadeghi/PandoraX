from django.db import models


class Media(models.Model):
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    image = models.FileField(upload_to='post_media/')
    activity = models.ForeignKey('activity.Activity', on_delete=models.CASCADE, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        app_label = 'activity'
