from django.views.decorators.http import require_http_methods
from decorators import is_authenticated, get_space
from django.http import JsonResponse
from space.models import Member
import json


@require_http_methods(['POST'])
@is_authenticated
@get_space
def user_toggle_active(request):
    status_map = {
        'active': True,
        'deactive': False
    }
    try:
        request_json = json.loads(request.body)
        status = status_map[request_json['status']]
        user_ids = request_json['users']
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad request"}, status=400)
    count = Member.objects.filter(user_id__in=user_ids, space=request.space, active=(not status)).update(active=status)
    return JsonResponse({'message': 'updated', 'count': count}, status=200)
