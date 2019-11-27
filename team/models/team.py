from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=200)
    team_lead = models.ForeignKey('user.User', related_name='sub_team', on_delete=models.CASCADE, null=True, blank=True)
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    members = models.ManyToManyField('user.User', related_name='team')
    active = models.BooleanField(default=True)

    class Meta:
        app_label = 'team'
