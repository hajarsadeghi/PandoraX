from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from user.models import User
from space.models import Space, Member
from decorators import is_authenticated
import json


@require_http_methods(['POST'])
@is_authenticated
def invite_members(request):
    try:
        request_json = json.loads(request.body)
        space = Space.objects.get(id=request_json['space_id'])#, owner=request.user)
        members = request_json['members']
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad request"}, status=400)
    except Space.DoesNotExist:
        return JsonResponse({"message": "space does not exists or you dont have permission"}, status=400)

    for member in members:
        user = User.objects.get_or_create(defaults={'email':member, 'username':member}, email=member)[0]
        Member.objects.get_or_create(user=user, space=space)

    return JsonResponse({'message': 'invited'}, status=200)
