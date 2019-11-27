from django.urls import path, include
from team.api import views

urlpatterns = [
    path('', views.Team.as_view(), name='crud'),
]
