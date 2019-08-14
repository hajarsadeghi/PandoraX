from django.contrib.auth import logout as logout_user
from django.shortcuts import redirect


def logout(request):
    if request.user.is_authenticated:
        logout_user(request)
    return redirect("frontview:login")
