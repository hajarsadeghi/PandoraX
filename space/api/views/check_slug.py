from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from decorators import is_authenticated
from space.models import Space
import json


@require_http_methods(['POST'])
@is_authenticated
def check_slug(request):
    try:
        request_json = json.loads(request.body)
        slug = request_json['slug']
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad request"}, status=400)
    slug_exists = Space.objects.filter(slug__iexact=slug).exists()
    return JsonResponse({'valid': not slug_exists}, status=200)
