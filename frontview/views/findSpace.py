from django.shortcuts import render


def findSpace(request):
    return render(request, 'getStarted/verfiy-email.html')