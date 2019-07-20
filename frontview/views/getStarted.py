from django.shortcuts import render


def getStarted(request):
    return render(request, 'getStarted/index.html')



