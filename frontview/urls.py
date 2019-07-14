from django.urls import path
from frontview import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('login', views.login, name='login'),
    path('multilanguage', views.multilanguage)
]
