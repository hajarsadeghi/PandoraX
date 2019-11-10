from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden, Http404
from utils import get_media_url, get_full_name, get_name_chars
from decorators import get_space



@login_required
@get_space
def profile(request, user_id):
    try:
        user_profile = request.space.member_set.get(user__id=user_id)
    except request.space.member_set.DoesNotExist:
        raise Http404
    user_spaces = request.user.member_set.values('space__name', 'space__slug', 'space__id')
    space_list = [{"id":space['space__id'], "name":space['space__name'], "slug":space['space__slug']} for space in user_spaces]
    context = {"space":request.space, "space_list":space_list}
    context['profile'] = {
        'id': user_profile.user.id,
        'full_name': get_full_name(user_profile.user.first_name, user_profile.user.last_name),
        'name_chars': get_name_chars(user_profile.user.first_name, user_profile.user.last_name),
        'profile_picture': user_profile.user.profile_picture,
        'wallet': {
            'budget_point_amount': user_profile.user.budget_point_amount(space=request.space),
            'earned_point_amount': user_profile.user.earned_point_amount(space=request.space)
        },
        'rank': user_profile.user.my_rank(space=request.space),
        'job_title': user_profile.job_title if user_profile.job_title else '',
        'bio': user_profile.user.bio if user_profile.user.bio else ''
    }
    return render(request, 'profile/index.html', context=context)
