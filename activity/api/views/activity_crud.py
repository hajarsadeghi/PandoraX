from django.views import View
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.db import transaction
from space.models import Member
from badge.models import Badge, BadgeLog
from activity.models import Activity as ActivityModel, Media
from decorators import is_authenticated, get_space
from django.db.models import Count, Q
from django.core.paginator import Paginator, InvalidPage
from utils import get_media_url, get_full_name, get_name_chars
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json, collections

channel_layer = get_channel_layer()


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class Activity(View):
    def get(self, request):
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
        queryset = ActivityModel.objects.filter(space=request.space).annotate(
            likes_count=Count('likes'),
            is_liked=Count('likes', filter=Q(likes__id=request.user.id)),
            comments_count=Count('comment', filter=Q(comment__parent__isnull=True))
        ).values(
            'id',
            'creator__id',
            'creator__first_name',
            'creator__last_name',
            'creator__profile_picture',

            'text',
            'timestamp',
            'likes_count',
            'is_liked',
            'comments_count',

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
            res['total_count'] = paginator.count
        else:
            res['total_count'] = queryset.count()

        tmp_media = Media.objects.filter(activity__id__in=[ac['id'] for ac in queryset]).values_list('activity__id', 'image')
        media = collections.defaultdict(list)
        for m in tmp_media:
            media[m[0]].append(get_media_url(m[1]))

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
                'comments_count': activity['comments_count'],
                'is_liked': bool(activity['is_liked']),
                'recognition': None,
                'media': media[activity['id']] if activity['id'] in media else []
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


    def post(self, request):
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
        activity = ActivityModel()
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

        async_to_sync(channel_layer.group_send)(f"feed_{request.space.slug}", {
            "type": "default_message",
            "message": {
                'type': 'new_activity',
                'data': {
                    'id': activity.id
                }
            },
        })
        return JsonResponse({'id':activity.id}, status=201)
