from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from decorators import is_authenticated
import json


@require_http_methods(['GET'])
@is_authenticated
def find_space(request):
    user_spaces = request.user.member_set.values('space__name', 'space__slug', 'space__id')
    res = [{"id":space['space__id'], "name":space['space__name'], "slug":space['space__slug']} for space in user_spaces]
    return JsonResponse(res, safe=False, status=200)
