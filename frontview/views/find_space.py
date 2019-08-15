from django.shortcuts import render
from space.models import Industry

def find_space(request):
    context = {}
    context['indutries'] = Industry.objects.filter(active=True).order_by('name').values('id', 'name')
    return render(request, 'get_started/find_space/index.html', context=context)
