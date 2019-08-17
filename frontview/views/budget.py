from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from decorators import get_space


@login_required
@get_space
def budget(request):
    user_spaces = request.user.member_set.values('space__name', 'space__slug', 'space__id')
    space_list = [{"id":space['space__id'], "name":space['space__name'], "slug":space['space__slug']} for space in user_spaces]
    return render(request, 'budget/index.html', context={"space":request.space, "space_list":space_list})
