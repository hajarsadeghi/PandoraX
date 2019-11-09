from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from decorators import is_authenticated, get_space
from transaction.models import Wallet
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

    res = {'my_rank': request.user.my_rank(space=request.space)}
    res['others'] = Wallet.objects.get_leaderboard(space=request.space, limit=leader_board_limit)
    return JsonResponse(res, status=200, safe=False)
