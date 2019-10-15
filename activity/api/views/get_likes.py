from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from activity.models import Activity
from decorators import is_authenticated, get_space
from utils import get_media_url, get_full_name, get_name_chars
import json



@require_http_methods(['GET'])
@is_authenticated
@get_space
def get_likes(request, activity_id):
    try:
        activity = Activity.objects.get(id=activity_id, space=request.space)
        pagin = json.loads(request.GET.get('pagin', 'false'))
        if pagin:
            pagin = {}
            pagin['data_limit'] = int(request.GET['data_limit'])
            pagin['page'] = int(request.GET['page'])
    except Activity.DoesNotExist:
        return JsonResponse({"message": "activity does not exists"}, status=400)
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad params"}, status=400)

    res = {}
    res['data'] = []
    res['activity_id'] = activity.id

    queryset = activity.likes.values('id', 'first_name', 'last_name', 'profile_picture')
    res['total_count'] = queryset.count()

    if pagin:
        paginator = Paginator(queryset, pagin['data_limit'])
        res['max_page'] = paginator.num_pages
        try:
            queryset = paginator.page(pagin['page'])
        except InvalidPage:
            queryset = []
        res['data_limit'] = pagin['data_limit']
        res['page'] = pagin['page']
    for like in queryset:
        tmp_like = {
            'id': like['id'],
            'full_name': get_full_name(like['first_name'], like['last_name']),
            'name_chars': get_name_chars(like['first_name'], like['last_name']),
            'profile_picture': get_media_url(like['profile_picture'])
        }
        res['data'].append(tmp_like)
    return JsonResponse(res, status=200)
