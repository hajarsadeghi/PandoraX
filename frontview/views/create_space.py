from django.shortcuts import render
from space.models import Industry
from django.contrib.auth.decorators import login_required


@login_required(login_url='frontview:verify_email')
def create_space(request):
    context = {}
    context['indutries'] = Industry.objects.filter(active=True).order_by('name').values('id', 'name')
    return render(request, 'get_started/create_space/index.html', context=context)
