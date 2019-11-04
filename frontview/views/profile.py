from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden, Http404
from utils import get_media_url, get_full_name, get_name_chars
from decorators import get_space



@login_required
@get_space
def profile(request, user_id):
    try:
        user_profile = request.space.member_set.get(user__id=user_id).user
    except request.space.member_set.DoesNotExist:
        raise Http404
    user_spaces = request.user.member_set.values('space__name', 'space__slug', 'space__id')
    space_list = [{"id":space['space__id'], "name":space['space__name'], "slug":space['space__slug']} for space in user_spaces]
    context = {"space":request.space, "space_list":space_list}
    context['profile'] = {
        'id': user_profile.id,
        'full_name': get_full_name(user_profile.first_name, user_profile.last_name),
        'name_chars': get_name_chars(user_profile.first_name, user_profile.last_name),
        'profile_picture': user_profile.profile_picture,
        'wallet': {
            'budget_point_amount': user_profile.budget_point_amount(space=request.space),
            'earned_point_amount': user_profile.earned_point_amount(space=request.space)
        },
        'rank': user_profile.my_rank(space=request.space)
    }
    return render(request, 'profile/index.html', context=context)
