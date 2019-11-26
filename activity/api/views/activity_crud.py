from django.views import View
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.db import transaction
from space.models import Member
from badge.models import Badge, BadgeLog
from activity.models import Activity as ActivityModel, Media
from decorators import is_authenticated, get_space
from django.db.models import Count, Q, OuterRef, Subquery
from django.core.paginator import Paginator, InvalidPage
from utils import get_media_url, user_serializer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import json, collections
from django.utils import timezone

channel_layer = get_channel_layer()


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class Activity(View):
    def get(self, request):
        try:
            creator = request.GET.get('creator_id', None)
            if creator:
                creator = Member.objects.get(user_id=int(creator), space=request.space).user
            pagin = json.loads(request.GET.get('pagin', 'false'))
            if pagin:
                pagin = {}
                pagin['data_limit'] = int(request.GET['data_limit'])
                pagin['page'] = int(request.GET['page'])
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad params"}, status=400)
        except Member.DoesNotExist:
            return JsonResponse({"message": "creator does not exists"}, status=400)

        res = {}
        res['data'] = []
        creator_info = Member.objects.filter(space_id=request.space.id, user_id=OuterRef('creator_id')).values('job_title')
        recognition_user_info = Member.objects.filter(space_id=request.space.id, user_id=OuterRef('recognition__to_user__id')).values('job_title')
        filters = [Q(space=request.space)]
        if creator:
            filters.append(Q(creator=creator))

        queryset = ActivityModel.objects.filter(*filters).annotate(
            likes_count=Count('likes', distinct=True),
            is_liked=Count('likes', distinct=True, filter=Q(likes__id=request.user.id)),
            comments_count=Count('comment', distinct=True, filter=Q(comment__parent__isnull=True)),
            creator__job_title=Subquery(creator_info),
            recognition__to_user__job_title=Subquery(recognition_user_info)
        ).values(
            'id',
            'creator__id',
            'creator__first_name',
            'creator__last_name',
            'creator__profile_picture',
            'creator__job_title',

            'text',
            'timestamp',
            'likes_count',
            'is_liked',
            'comments_count',

            'recognition__id',
            'recognition__point_amount',
            'recognition__to_user__first_name',
            'recognition__to_user__last_name',
            'recognition__to_user__id',
            'recognition__to_user__profile_picture',
            'recognition__to_user__job_title',

            'recognition__badge__id',
            'recognition__badge__name',
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
                'user': user_serializer(
                    activity['creator__id'],
                    request.space,
                    activity['creator__first_name'],
                    activity['creator__last_name'],
                    activity['creator__profile_picture'],
                    activity['creator__job_title'],
                ),
                'text': activity['text'],
                'timestamp': timezone.localtime(activity['timestamp']).isoformat(),
                'likes_count': activity['likes_count'],
                'comments_count': activity['comments_count'],
                'is_liked': bool(activity['is_liked']),
                'recognition': None,
                'media': media[activity['id']] if activity['id'] in media else []
            }
            if activity['recognition__id']:
                tmp_recognition = {
                    'from_user': tmp_activity['user'],
                    'to_user': user_serializer(
                        activity['recognition__to_user__id'],
                        request.space,
                        activity['recognition__to_user__first_name'],
                        activity['recognition__to_user__last_name'],
                        activity['recognition__to_user__profile_picture'],
                        activity['recognition__to_user__job_title'],
                    ),
                    'badge': {
                        'id': activity['recognition__badge__id'],
                        'name': activity['recognition__badge__name'],
                        'point_amount': activity['recognition__point_amount'],
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
            recognition_obj.point_amount = activity_recognition['badge'].point_amount
            recognition_obj.space = request.space


        with transaction.atomic():
            if activity_recognition:
                recognition_obj.save()
                recognition_obj.refresh_from_db()
                activity.recognition = recognition_obj
            activity.save()
            activity.refresh_from_db()
            activity_media.update(activity=activity)
        res = {'id':activity.id}
        if activity_recognition:
            recognition_obj.apply()
            res['wallet'] = {
                'budget_point_amount': request.user.budget_point_amount(space=request.space),
                'earned_point_amount': request.user.earned_point_amount(space=request.space)
            }
        async_to_sync(channel_layer.group_send)(f"feed_{request.space.slug}", {
            "type": "default_message",
            "message": {
                'type': 'new_activity',
                'data': {
                    'id': activity.id
                }
            },
        })
        return JsonResponse(res, status=201)
