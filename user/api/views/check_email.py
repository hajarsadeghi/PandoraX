from django.views.decorators.http import require_http_methods
from decorators import is_authenticated, get_space
from django.http import JsonResponse
from utils import get_media_url, get_name_chars
from user.models import User
import json


@require_http_methods(['POST'])
@is_authenticated
@get_space
def check_email(request):
    try:
        request_json = json.loads(request.body)
        user_email = request_json['email']
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad request"}, status=400)
    try:
        user = User.objects.get(email__iexact=user_email)
        res = {
            'found': True,
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'name_chars': get_name_chars(user.first_name, user.last_name),
            'profile_picture': get_media_url(user.profile_picture),
        }
        return JsonResponse(res, status=200)
    except User.DoesNotExist:
        return JsonResponse({'found': False}, status=200)
