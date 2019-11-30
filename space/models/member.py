from django.db import models

class Member(models.Model):
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    job_title = models.CharField(max_length=100, null=True, blank=True)
    joined_date = models.DateTimeField(auto_now_add=True, auto_now=False)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.user.get_full_name()} - {self.space.name}"

    class Meta:
        app_label = 'space'
