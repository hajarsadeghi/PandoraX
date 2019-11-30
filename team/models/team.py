from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=200)
    team_lead = models.ForeignKey('user.User', related_name='sub_teams', on_delete=models.CASCADE, null=True, blank=True)
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    members = models.ManyToManyField('space.Member', related_name='teams')
    active = models.BooleanField(default=True)

    class Meta:
        app_label = 'team'
