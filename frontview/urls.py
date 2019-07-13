from django.urls import path
from frontview import views

frontview_urlpatterns = [
    path('', views.dashboard),
    path('login', views.login),
]
