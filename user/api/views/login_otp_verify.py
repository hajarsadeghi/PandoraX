from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login
from django.core.cache import cache
import json


@require_http_methods(['POST'])
def login_otp_verify(request):
    OTP_MAX_TRY = 5
    try:
        request_json = json.loads(request.body)
        user_email = request_json['user_email']
        user_otp = request_json['user_otp']
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad request"}, status=400)
    try:
        user = User.objects.get(email__exact=user_email)
    except User.DoesNotExist:
        return JsonResponse({'message': 'invalid otp'}, status=400)

    cache_key = f"login_otp_{user_email}"
    cache_otp = cache.get(key=cache_key)
    if cache_otp:
        valid_otp = cache_otp.split(':')[0]
        try_count = int(cache_otp.split(':')[1])
        if valid_otp == user_otp:
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            return JsonResponse({'message': 'logged in successfully'}, status=200)
        else:
            if try_count < OTP_MAX_TRY-1:
                cache.set(key=cache_key, value=f"{valid_otp}:{try_count+1}", timeout=cache.ttl(cache_key))
            else:
                cache.expire(key=cache_key, timeout=0)
    return JsonResponse({'message': 'invalid otp'}, status=400)
