from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from decorators import get_space


@login_required
@get_space
def feed(request):
    return render(request, 'home/index.html', context={"space":request.space})
