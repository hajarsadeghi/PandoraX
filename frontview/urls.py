from django.urls import path, include
from frontview import views

get_started_urls = [
    path('', views.getStarted, name='getStarted'),
    path('verify_email', views.verify_email, name='verify_email'),
    path('create_space', views.create_space, name='create_space'),
    path('find_space', views.find_space, name='find_space'),
]

urlpatterns = [
    path('', views.home, name='home'),
    path('budget', views.budget, name='budget'),
    path('login', views.login, name='login'),
    path('get_started/', include((get_started_urls, 'frontview'), namespace='get_started')),
    path('multilanguage', views.multilanguage)
]