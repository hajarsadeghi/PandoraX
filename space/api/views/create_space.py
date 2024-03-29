from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from user.models import User
from space.models import Space, Industry, Member
from transaction.models import Wallet
from decorators import is_authenticated
import json


@require_http_methods(['POST'])
@is_authenticated
def create_space(request):
    try:
        request_json = json.loads(request.body)
        name = request_json['name']
        slug = request_json['slug']
        if Space.objects.filter(slug__iexact=slug).exists():
            return JsonResponse({"message": "duplicate slug"}, status=400)
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
    Wallet.objects.create(user=request.user, space=space, type=Wallet.EARNED_TYPE)
    return JsonResponse({'id': space.id}, status=201)
