from django.views import View
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.apps import apps
from django.db.models import Q, OuterRef, Subquery
from decorators import is_authenticated, get_space
from django.core.paginator import Paginator, InvalidPage
from django.db.models import ObjectDoesNotExist
from space.models import Member
from utils import user_serializer
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class Like(View):
    def get(self, request, object_id, object_model, space_validator):
        ObjectModel = apps.get_model(object_model)
        query_kwargs = {
            'id': object_id,
            space_validator: request.space.id
        }
        try:
            object = ObjectModel.objects.get(**query_kwargs)
            pagin = json.loads(request.GET.get('pagin', 'false'))
            if pagin:
                pagin = {}
                pagin['data_limit'] = int(request.GET['data_limit'])
                pagin['page'] = int(request.GET['page'])
        except ObjectModel.DoesNotExist:
            return JsonResponse({"message": "object does not exists"}, status=400)
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad params"}, status=400)

        res = {}
        res['data'] = []
        res['object_id'] = object.id

        user_info = Member.objects.filter(space_id=request.space, user_id=OuterRef('id')).values('job_title')
        queryset = object.likes.annotate(job_title=Subquery(user_info)).values('id', 'first_name', 'last_name', 'profile_picture', 'job_title')
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
            tmp_like = user_serializer(
                    like['id'],
                    request.space,
                    like['first_name'],
                    like['last_name'],
                    like['profile_picture'],
                    like['job_title'],
            )
            res['data'].append(tmp_like)
        return JsonResponse(res, status=200)


    def post(self, request, object_id, object_model, space_validator):
        ObjectModel = apps.get_model(object_model)
        query_kwargs = {
            'id': object_id,
            space_validator: request.space.id
        }
        try:
            object = ObjectModel.objects.get(**query_kwargs)
        except ObjectModel.DoesNotExist:
            return JsonResponse({"message": "object does not exists"}, status=400)
        res = {'object_id':object.id}
        try:
            object.likes.get(id=request.user.id)
            object.likes.remove(request.user)
            res['status'] = 'disliked'
        except ObjectDoesNotExist:
            object.likes.add(request.user)
            res['status'] = 'liked'
        res['like_count'] = object.likes.count()
        return JsonResponse(res, status=200)
