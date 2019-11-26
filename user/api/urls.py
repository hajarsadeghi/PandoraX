from django.urls import path, include
from user.api import views

login_otp_urls = [
    path('request/', views.login_otp_request, name='request'),
    path('verify/', views.login_otp_verify, name='verify'),
]

user_urls = [
    path('received_badges/', views.received_badges, name='received_badges'),
]

login_urls = [
    path('otp/', include((login_otp_urls, 'login'), namespace='otp')),
]

urlpatterns = [
    path('', views.user.as_view(), name='crud'),
    path('<int:user_id>/', include((user_urls, 'user'), namespace='user_object')),
    path('oauth/', include(('social_django.urls', 'user'), namespace='oauth')),
    path('login/', include((login_urls, 'user'), namespace='login')),
    path('logout/', views.logout, name='logout'),
]
