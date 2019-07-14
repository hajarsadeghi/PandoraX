from django.shortcuts import render, redirect


def login(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    return render(request, 'login/index.html')
