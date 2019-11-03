from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from decorators import is_authenticated, get_space
from transaction.models import Wallet
import json


@require_http_methods(['GET'])
@is_authenticated
@get_space
def wallet_status(request):
    res = {
        'budget_point_amount': request.user.budget_point_amount(space=request.space),
        'earned_point_amount': request.user.earned_point_amount(space=request.space)
    }
    return JsonResponse(res, status=200, safe=False)
