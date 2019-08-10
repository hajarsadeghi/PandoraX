from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    is_username_set = models.BooleanField(default=False)

    class Meta:
        app_label = 'user'
