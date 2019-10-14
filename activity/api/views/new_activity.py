from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.db import transaction
from space.models import Member
from badge.models import Badge, BadgeLog
from activity.models import Activity, Media
from decorators import is_authenticated, get_space
import json


@require_http_methods(['POST'])
@is_authenticated
@get_space
def new_activity(request):
    try:
        data = json.loads(request.body)
        activity_text = data['text']
        activity_recognition = data.get('recognition')
        if activity_recognition:
            activity_recognition['user'] = Member.objects.get(space=request.space, user__id=activity_recognition['user'], user__is_active=True, active=True).user
            activity_recognition['badge'] = Badge.objects.get(space=request.space, active=True, id=activity_recognition['badge'])
        media = data.get('media', [])
        activity_media = Media.objects.filter(id__in=media, user=request.user, activity=None)
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad params"}, status=400)
    activity = Activity()
    activity.space = request.space
    activity.creator = request.user
    activity.text = activity_text

    if activity_recognition:
        recognition_obj = BadgeLog()
        recognition_obj.from_user = request.user
        recognition_obj.to_user = activity_recognition['user']
        recognition_obj.badge = activity_recognition['badge']
        recognition_obj.space = request.space


    with transaction.atomic():
        if activity_recognition:
            recognition_obj.save()
            recognition_obj.refresh_from_db()
            activity.recognition = recognition_obj
        activity.save()
        activity.refresh_from_db()
        activity_media.update(activity=activity)

    return JsonResponse({'id':activity.id}, status=201)
