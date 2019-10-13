from django.db import models


class Activity(models.Model):
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    creator = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='activity_set')
    text = models.TextField()
    likes = models.ManyToManyField('user.User', related_name='liked_activity_set')
    recognition = models.ForeignKey('badge.BadgeLog', on_delete=models.CASCADE, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        app_label = 'activity'
