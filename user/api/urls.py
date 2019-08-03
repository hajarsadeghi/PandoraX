from django.urls import path, include
from user.api import views

login_otp_urls = [
    path('request/', views.login_otp_request, name='request'),
    path('verify/', views.login_otp_verify, name='verify'),
]

login_urls = [
    path('otp/', include((login_otp_urls, 'login'), namespace='otp')),
    path('oauth/', include(('social_django.urls', 'login'), namespace='oauth')),
]

urlpatterns = [
    path('login/', include((login_urls, 'user'), namespace='login')),
]
