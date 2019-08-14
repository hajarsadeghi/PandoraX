from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from user.models import User
from space.models import Space, Industry, Member
import json


@require_http_methods(['POST'])
def create_space(request):
    try:
        request_json = json.loads(request.body)
        name = request_json['name']
        slug = request_json['slug']
        industry = Industry.objects.get(id=request_json['industry_id'], active=True).id
        members_count = request_json['members_count']
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad request"}, status=400)
    except Industry.DoesNotExist:
        return JsonResponse({"message": "industry does not exists"}, status=400)

    space = Space()
    space.owner = request.user
    space.name = name
    space.slug = slug
    space.industry_id = industry
    space.members_count = members_count
    space.save()
    space.refresh_from_db()
    Member.objects.create(space=space, user=request.user)

    return JsonResponse({'id': space.id}, status=201)
