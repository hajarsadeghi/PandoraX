from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    is_username_set = models.BooleanField(default=False)

    def __str__(self):
        return f"{'' if not self.first_name else self.first_name} {'' if not self.last_name else self.last_name}".strip()
    
    class Meta:
        app_label = 'user'
