from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from activity.models import Activity
from user.models import User
from decorators import is_authenticated, get_space


@require_http_methods(['POST'])
@is_authenticated
@get_space
def like_toggle(request, activity_id):
    try:
        activity = Activity.objects.get(id=activity_id, space=request.space)
    except Activity.DoesNotExist:
        return JsonResponse({"message": "activity does not exists"}, status=400)
    res = {'activity_id':activity.id}
    try:
        activity.likes.get(id=request.user.id)
        activity.likes.remove(request.user)
        res['status'] = 'disliked'
    except User.DoesNotExist:
        activity.likes.add(request.user)
        res['status'] = 'liked'
    res['like_count'] = activity.likes.count()
    return JsonResponse(res, status=200)
