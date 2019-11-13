from django.views import View
from django.http import JsonResponse
from badge.models import Badge, Icon
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class BadgeObject(View):
    def put(self, request, badge_id):
        update_fields = []
        try:
            badge = Badge.objects.get(id=badge_id, space=request.space)
            request_json = json.loads(request.body)
            if 'name' in request_json:
                badge.name = str(request_json['name'])
                update_fields.append('name')
            if 'point_amount' in request_json:
                badge.point_amount = int(request_json['point_amount'])
                update_fields.append('point_amount')
            if 'description' in request_json:
                badge.description = str(request_json['description'])
                update_fields.append('description')
            if 'icon_id' in request_json:
                try:
                    badge.icon = Icon.objects.get(Q(id=request_json['icon_id']), Q(space=request.space)|Q(is_global=True))
                except Icon.DoesNotExists:
                    return JsonResponse({"message": "icon does not exits"}, status=400)
        except Badge.DoesNotExist:
            return JsonResponse({"message": "badge not found"}, safe=False, status=400)
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad json"}, status=400)
        badge.save(update_fields=update_fields)
        return JsonResponse({'message': 'updated'}, safe=False, status=200)


    def delete(self, request, badge_id):
        try:
            badge = Badge.objects.get(id=badge_id, space=request.space)
        except Badge.DoesNotExist:
            return JsonResponse({"message": "badge not found"}, safe=False, status=400)
        badge.active = False
        badge.save(update_fields=['active'])
        return JsonResponse(tmp_badge, status=201)
