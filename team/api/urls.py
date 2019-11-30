from django.urls import path, include
from team.api import views

team_urls = [
    path('members/', views.team_members, name='members'),
]

urlpatterns = [
    path('', views.Team.as_view(), name='crud'),
    path('<int:team_id>/', include((team_urls, 'team'), namespace='object')),
]
