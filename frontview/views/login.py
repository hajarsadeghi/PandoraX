from django.shortcuts import render, redirect


def login(request):
    if request.user.is_authenticated:
        return redirect(request.GET.get('next', 'frontview:landing'))
    return render(request, 'login/index.html')
