from django.http import JsonResponse
from django.db.models import ObjectDoesNotExist
from django.http import HttpResponseForbidden, Http404
import json


def get_space(func, type='url'):
    def wrapper(request, *args, **kwargs):
        space_slug = kwargs.get('space_slug', None)
        space_id = request.META.get('HTTP_SPACE_ID', None)
        if not any([space_slug, space_id]):
            return HttpResponseForbidden()

        if space_slug:
            del kwargs['space_slug']
            try:
                space = request.user.member_set.get(space__slug__iexact=space_slug).space
            except ObjectDoesNotExist:
                raise Http404
        elif space_id:
            try:
                space = request.user.member_set.get(space__id=space_id).space
            except ObjectDoesNotExist:
                return HttpResponseForbidden()

        request.space = space
        return func(request, *args, **kwargs)
    return wrapper
