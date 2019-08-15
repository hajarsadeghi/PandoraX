from django.shortcuts import render
from space.models import Industry

def find_space(request):
    context = {}
    user_spaces = request.user.member_set.values('space__name', 'space__slug', 'space__id')
    context['spaces'] = [{"id":space['space__id'], "name":space['space__name'], "slug":space['space__slug']} for space in user_spaces]
    return render(request, 'get_started/find_space/index.html', context=context)
