from django.db import models

class Space(models.Model):
    name = models.CharField(max_length=50)
    slug = models.CharField(max_length=50, unique=True)
    industry = models.ForeignKey('space.Industry', null=True, blank=True, on_delete=models.CASCADE)
    member_count = models.PositiveSmallIntegerField(null=True, blank=True)

    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, auto_now=False)
    owner = models.ForeignKey('user.User', on_delete=models.CASCADE)

    class Meta:
        app_label = 'space'

    def __str__(self):
        return self.name
