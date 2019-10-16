from django.views import View
from django.utils.decorators import method_decorator
from activity.models import Activity, Comment as CommentModel
from decorators import is_authenticated, get_space
from django.core.paginator import Paginator, InvalidPage
from utils import get_media_url, get_full_name, get_name_chars
from django.db.models import Q, Count
from django.http import JsonResponse
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class Comment(View):
    def get(self, request, activity_id):
        try:
            activity = Activity.objects.get(id=activity_id, space=request.space)
            pagin = json.loads(request.GET.get('pagin', 'false'))
            parent = request.GET.get('parent_id', None)
            if parent:
                parent = int(parent)
                parent = CommentModel.objects.get(id=parent, activity=activity, parent=None)
            if pagin:
                pagin = {}
                pagin['data_limit'] = int(request.GET['data_limit'])
                pagin['page'] = int(request.GET['page'])
        except Activity.DoesNotExist:
            return JsonResponse({"message": "activity does not exists"}, status=400)
        except CommentModel.DoesNotExist:
            return JsonResponse({"message": "parent does not exists"}, status=400)
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad params"}, status=400)

        res = {}
        res['data'] = []

        queryset = CommentModel.objects.filter(activity=activity, parent=parent).annotate(
            reply_count=Count('reply_set', distinct=True)).annotate(
            likes_count=Count('likes', distinct=True)).annotate(
            is_liked=Count('likes', distinct=True, filter=Q(likes__id=request.user.id))
        ).values(
            'id',
            'user__id',
            'user__first_name',
            'user__last_name',
            'user__profile_picture',

            'text',
            'timestamp',
            'likes_count',
            'is_liked',
            'reply_count'
        ).order_by('-id')

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
        for comment in queryset:
            tmp_comment = {
                'id': comment['id'],
                'user': {
                    'id': comment['user__id'],
                    'full_name': get_full_name(comment['user__first_name'], comment['user__last_name']),
                    'name_chars': get_name_chars(comment['user__first_name'], comment['user__last_name']),
                    'profile_picture': get_media_url(comment['user__profile_picture'])
                },
                'text': comment['text'],
                'timestamp': comment['timestamp'].strftime('%Y/%m/%d %H:%M:%S'),
                'likes_count': comment['likes_count'],
                'reply_count': comment['reply_count'],
                'is_liked': bool(comment['is_liked']),
            }
            res['data'].append(tmp_comment)
        return JsonResponse(res, safe=False, status=200)


    def post(self, request, activity_id):
        try:
            activity = Activity.objects.get(id=activity_id, space=request.space)

            data = json.loads(request.body)
            text = data['text']
            parent = data.get('parent_id', None)
            if parent:
                parent = int(parent)
                parent = CommentModel.objects.get(id=parent, activity=activity, parent=None)
        except Activity.DoesNotExist:
            return JsonResponse({"message": "activity does not exists"}, status=400)
        except CommentModel.DoesNotExist:
            return JsonResponse({"message": "parent does not exists"}, status=400)
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad params"}, status=400)

        comment = CommentModel.objects.create(user=request.user, activity=activity, parent=parent, text=text)
        comment.refresh_from_db()
        return JsonResponse({'id':comment.id}, status=201)
