from django.views import View
from django.http import JsonResponse
from badge.models import Icon as IconModel
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class Icon(View):
    def get(self, request):
        icons = IconModel.objects.filter(space=request.space, active=True).values('id', 'image')
        resp = []
        for icon in icons:
            tmp_icon = {
                "id":icon['id'],
                "image":icon['image']
            }
            resp.append(tmp_icon)
        return JsonResponse(resp, safe=False, status=200)


    def post(self, request):
        "create icon"
        try:
            image = request.FILES['image']
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad request"}, status=400)

        icon = IconModel()
        icon.image = image
        icon.space = request.space
        icon.creator = request.user
        icon.save()
        icon.refresh_from_db()

        return JsonResponse({'id': icon.id}, status=201)
