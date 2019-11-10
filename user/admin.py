from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from user.models import User


class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
            (None, {'fields': ('profile_picture','bio')}),
    )

admin.site.register(User, UserAdmin)
