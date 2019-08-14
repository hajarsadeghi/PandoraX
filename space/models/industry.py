from django.db import models

class Industry(models.Model):
    name = models.CharField(max_length=50)
    active = models.BooleanField(default=True)

    class Meta:
        app_label = 'space'

    def __str__(self):
        return self.name
