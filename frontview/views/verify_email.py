from django.shortcuts import render


def verify_email(request):
    return render(request, 'getStarted/verify_email.html')