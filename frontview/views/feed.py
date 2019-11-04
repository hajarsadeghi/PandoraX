from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from decorators import get_space
from transaction.models import Wallet


@login_required
@get_space
def feed(request):
    context = {"space":request.space}
    user_spaces = request.user.member_set.values('space__name', 'space__slug', 'space__id')
    context['space_list'] = [{"id":space['space__id'], "name":space['space__name'], "slug":space['space__slug']} for space in user_spaces]
    context['wallet'] = {
        'budget_point_amount': request.user.budget_point_amount(space=request.space),
        'earned_point_amount': request.user.earned_point_amount(space=request.space)
    }
    context['leaderboard'] = {
        'my_rank': request.user.my_rank(space=request.space),
        'others': Wallet.objects.get_leaderboard(space=request.space, limit=3)
    }
    print(context)
    return render(request, 'feed/index.html', context=context)
