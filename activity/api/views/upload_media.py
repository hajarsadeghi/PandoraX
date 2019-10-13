from django.views.decorators.http import require_http_methods
from decorators import is_authenticated, get_space
from django.http import JsonResponse
from activity.models import Media
import json


@require_http_methods(['POST'])
@is_authenticated
@get_space
def upload_media(request):
    try:
        image = request.FILES['image']
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad request"}, status=400)
    media = Media()
    media.user = request.user
    media.space = request.space
    media.image = image
    media.save()
    media.refresh_from_db()
    return JsonResponse({'id':media.id, 'src':media.image.url}, status=201)
