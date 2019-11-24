from django.views.decorators.http import require_http_methods
from decorators import is_authenticated, get_space
from django.http import JsonResponse
from space.models import Member
from badge.models import BadgeLog
from utils import get_media_url, get_full_name
from django.utils import timezone
import json


@require_http_methods(['GET'])
@is_authenticated
@get_space
def received_badges(request, user_id):
    try:
        user = Member.objects.get(user_id=int(user_id), space=request.space).user
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad request"}, status=400)
    except Member.DoesNotExist:
        return JsonResponse({"message": "user does not exists"}, status=400)

    received_badges = BadgeLog.objects.filter(space=request.space, to_user=user).values(
        'badge__id',
        'badge__name',
        'badge__description',
        'badge__icon__image',

        'from_user__id',
        'from_user__first_name',
        'from_user__last_name',

        'point_amount',
        'timestamp'
    )
    resp = []
    for badge in received_badges:
        tmp_badge = {
            "id":badge['badge__id'],
            "name":badge['badge__name'],
            "from_user":{
                "id":badge['from_user__id'],
                "full_name": get_full_name(badge['from_user__first_name'], badge['from_user__last_name']),
            },
            "point_amount": badge['point_amount'],
            "description": badge['badge__description'],
            "icon": get_media_url(badge['badge__icon__image']),
            "timestamp": timezone.localtime(badge['timestamp']).isoformat()
        }
        resp.append(tmp_badge)
    return JsonResponse(resp, status=200)
