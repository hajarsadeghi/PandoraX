from django.urls import path
from frontview import views

urlpatterns = [
    path('', views.home, name='home'),
    path('budget', views.budget, name='budget'),
    path('login', views.login, name='login'),
    path('getStarted', views.getStarted, name='getStarted'),
    path('getStarted/findSpace', views.findSpace, name='findSpace'),
    path('space', views.space, name='space'),
    path('multilanguage', views.multilanguage)
]
