from django.views import View
from django.http import JsonResponse
from badge.models import Badge as BadgeModel, Icon
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
from utils import get_media_url, get_full_name
from django.db.models import Q
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class Badge(View):
    def get(self, request):
        badges = BadgeModel.objects.filter(space=request.space).values('id', 'name', 'creator__id', 'creator__first_name', 'creator__last_name', 'creator__id', 'point_amount', 'description', 'icon__image', 'active', 'created_date')
        resp = []
        for badge in badges:
            tmp_badge = {
                "id":badge['id'],
                "name":badge['name'],
                "creator":{
                    "id":badge['creator__id'],
                    "full_name": get_full_name(badge['creator__first_name'], ['creator__last_name']),
                },
                "point_amount": badge['point_amount'],
                "description": badge['description'],
                "icon": get_media_url(badge['icon__image']),
                "active": badge['active'],
                "created_date":badge['created_date'].strftime('%Y/%m/%d %H:%M:%S')
            }
            resp.append(tmp_badge)
        return JsonResponse(resp, safe=False, status=200)


    def post(self, request):
        "create badge"
        try:
            request_json = json.loads(request.body)
            badge_name = request_json['name']
            badge_point_amount = int(request_json['point_amount'])
            badge_description = request_json['description']
            badge_icon = int(request_json['icon_id'])
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad request"}, status=400)

        try:
            badge_icon = Icon.objects.get(Q(id=badge_icon), Q(space=request.space)|Q(is_global=True))
        except Icon.DoesNotExists:
            return JsonResponse({"message": "icon does not exits"}, status=400)

        badge = BadgeModel()
        badge.name = badge_name
        badge.space = request.space
        badge.creator = request.user
        badge.point_amount = badge_point_amount
        badge.description = badge_description
        badge.icon = badge_icon
        badge.save()
        badge.refresh_from_db()
        tmp_badge = {
            "id":badge.id,
            "name":badge.name,
            "creator":{
                "id":badge.creator.id,
                "full_name": get_full_name(badge.creator.first_name, badge.creator.last_name),
            },
            "point_amount": badge.point_amount,
            "description": badge.description,
            "icon": badge.icon.image.url,
            "active": badge.active,
            "created_date":badge.created_date.strftime('%Y/%m/%d %H:%M:%S')
        }
        return JsonResponse(tmp_badge, status=201)
