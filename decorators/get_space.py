from django.http import JsonResponse
from django.db.models import ObjectDoesNotExist
from django.http import Http404
import json

def get_space(func):
    def wrapper(request, space_slug, *args, **kwargs):
        try:
            space = request.user.member_set.get(space__slug__iexact=space_slug).space
        except ObjectDoesNotExist:
            raise Http404
        request.space = space
        return func(request, *args, **kwargs)
    return wrapper
