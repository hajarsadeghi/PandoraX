from django.views import View
from django.http import JsonResponse
from badge.models import Icon as IconModel
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
from pandora_x.settings import MEDIA_URL
from os.path import join as path_join
from django.db.models import Q
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class Icon(View):
    def get(self, request):
        icons = IconModel.objects.filter(Q(active=True), Q(space=request.space)|Q(is_global=True)).values('id', 'image')
        resp = []
        for icon in icons:
            tmp_icon = {
                "id": icon['id'],
                "src": path_join(MEDIA_URL, icon['image'])
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

        return JsonResponse({'id':icon.id, 'src':icon.url}, status=201)
