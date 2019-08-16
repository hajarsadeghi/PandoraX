from django.shortcuts import render


def verify_email(request):
    if request.user.is_authenticated:
        return redirect(request.GET.get('next', 'frontview:landing'))
    return render(request, 'verify_email/index.html')
