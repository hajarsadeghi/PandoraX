from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from decorators import is_authenticated, get_space
from transaction.models import Wallet
from django.db.models import Window, F
from django.db.models.functions import RowNumber
import json


@require_http_methods(['GET'])
@is_authenticated
@get_space
def leader_board(request):
    try:
        leader_board_limit = request.GET.get('page', 10)
        leader_board_limit = int(leader_board_limit)
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad params"}, status=400)

    res = {'my_rank': request.user.my_rank(space=request.space), 'others': []}
    rank_window_function = Window(expression=RowNumber(), order_by=F('point_amount').desc())
    other_ranks = Wallet.objects.filter(type=Wallet.EARNED_TYPE, space=request.space).annotate(rank=rank_window_function).values(
        'rank',
        'user__id',
        'user__first_name',
        'user__last_name',
        'user__profile_picture',
        'point_amount'
    ).order_by('rank')[:leader_board_limit]

    for rank in other_ranks:
        tmp_rank = {
            'id': rank['user__id'],
            'rank': rank['rank'],
            'point_amount': rank['point_amount'],
            'full_name': get_full_name(rank['user__first_name'], rank['user__last_name']),
            'name_chars': get_name_chars(rank['user__first_name'], rank['user__last_name']),
            'profile_picture': get_media_url(rank['user__profile_picture'])
        }
        res['others'].append(tmp_rank)
    return JsonResponse(res, status=200, safe=False)
