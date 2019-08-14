from django.http import JsonResponse
import json

def is_authenticated(func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return func(request, *args, **kwargs)
        return JsonResponse({'message': "You are not authenticated"}, status=401)
    return wrapper
