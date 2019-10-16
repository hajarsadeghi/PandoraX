from django.views import View
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.apps import apps
from django.db.models import Q
from decorators import is_authenticated, get_space
from django.core.paginator import Paginator, InvalidPage
from django.db.models import ObjectDoesNotExist
from utils import get_media_url, get_full_name, get_name_chars
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class Like(View):
    object_model = 'activity.Activity'

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

        queryset = object.likes.values('id', 'first_name', 'last_name', 'profile_picture')
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
