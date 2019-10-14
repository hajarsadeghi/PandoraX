from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.db.models import Count
from activity.models import Activity, Media
from decorators import is_authenticated, get_space
from django.core.paginator import Paginator, InvalidPage
from utils import get_media_url, get_full_name, get_name_chars
import collections
import json


@require_http_methods(['GET'])
@is_authenticated
@get_space
def feed(request):
    try:
        pagin = json.loads(request.GET.get('pagin', 'false'))
        if pagin:
            pagin = {}
            pagin['data_limit'] = int(request.GET['data_limit'])
            pagin['page'] = int(request.GET['page'])
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad params"}, status=400)
    res = {}
    res['data'] = []
    queryset = Activity.objects.filter(space=request.space).annotate(likes_count=Count('likes')).values(
        'id',
        'creator__id',
        'creator__first_name',
        'creator__last_name',
        'creator__profile_picture',

        'text',
        'timestamp',
        'likes_count',

        'recognition__id',
        'recognition__to_user__first_name',
        'recognition__to_user__last_name',
        'recognition__to_user__id',
        'recognition__to_user__profile_picture',

        'recognition__badge__id',
        'recognition__badge__name',
        'recognition__badge__point_amount',
        'recognition__badge__icon__image'
    ).order_by('-id')

    if pagin:
        paginator = Paginator(queryset, pagin['data_limit'])
        res['max_page'] = paginator.num_pages
        try:
            queryset = paginator.page(pagin['page'])
        except InvalidPage:
            queryset = []
        res['data_limit'] = pagin['data_limit']
        res['page'] = pagin['page']
    tmp_media = Media.objects.filter(activity__id__in=[queryset.values_list('id', flat=True)]).values_list('activity__id', 'image')
    media = collections.defaultdict(list)
    for m in tmp_media:
        media[m[0]].append(m[1])

    for activity in queryset:
        tmp_activity = {
            'id': activity['id'],
            'user': {
                'id': activity['creator__id'],
                'full_name': get_full_name(activity['creator__first_name'], activity['creator__last_name']),
                'name_chars': get_name_chars(activity['creator__first_name'], activity['creator__last_name']),
                'profile_picture': get_media_url(activity['creator__profile_picture'])
            },
            'text': activity['text'],
            'timestamp': activity['timestamp'].strftime('%Y/%m/%d %H:%M:%S'),
            'likes_count': activity['likes_count'],
            'recognition': None,
            'media': media[activity['id']] if activity['id'] in media else None
        }
        if activity['recognition__id']:
            tmp_recognition = {
                'from_user': tmp_activity['user'],
                'to_user': {
                    'id': activity['recognition__to_user__id'],
                    'full_name': get_full_name(activity['recognition__to_user__first_name'], activity['recognition__to_user__last_name']),
                    'name_chars': get_name_chars(activity['recognition__to_user__first_name'], activity['recognition__to_user__last_name']),
                    'profile_picture': get_media_url(activity['recognition__to_user__profile_picture'])
                },
                'badge': {
                    'id': activity['recognition__badge__id'],
                    'name': activity['recognition__badge__name'],
                    'point_amount': activity['recognition__badge__point_amount'],
                    'icon': get_media_url(activity['recognition__badge__icon__image']),
                }
            }
            tmp_activity['recognition'] = tmp_recognition
        res['data'].append(tmp_activity)
    return JsonResponse(res, status=200)
