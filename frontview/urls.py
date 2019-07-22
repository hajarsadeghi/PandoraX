from django.urls import path
from frontview import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('login', views.login, name='login'),
    path('getStarted', views.getStarted, name='getStarted'),
    path('space', views.space, name='space'),
    path('multilanguage', views.multilanguage)
]
