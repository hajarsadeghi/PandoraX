from django.db import models


class Comment(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='comment_set')
    text = models.TextField()
    likes = models.ManyToManyField('user.User', related_name='liked_comment_set')
    timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
    activity = models.ForeignKey('activity.Activity', on_delete=models.CASCADE)
    parent = models.ForeignKey('activity.Comment', on_delete=models.CASCADE, null=True, blank=True, related_name='reply_set')

    class Meta:
        app_label = 'activity'
