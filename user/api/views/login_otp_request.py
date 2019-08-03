from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core.cache import cache
from random import randint
import json


@require_http_methods(['POST'])
def login_otp_request(request):
    OTP_EXPIRE = 120
    try:
        request_json = json.loads(request.body)
        user_email = request_json['user_email']
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad request"}, status=400)

    user = User.objects.get_or_create(defaults={'email':user_email, 'username':user_email}, email__exact=user_email)[0]

    # generate random 6 digit otp
    otp = str(randint(100000, 999999))
    # set otp to cache backend with try_count on value
    cache.set(key=f"login_otp_{user_email}", value=f"{otp}:0", timeout=OTP_EXPIRE)

    print()
    print()
    print(f"OTP for user {user_email} is: {otp}")
    print()
    print()

    return JsonResponse({'expire': OTP_EXPIRE}, status=200)
