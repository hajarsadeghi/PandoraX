from django.shortcuts import render


def space(request):
    return render(request, 'space/index.html')



