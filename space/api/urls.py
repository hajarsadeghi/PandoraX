from django.urls import path
from space.api import views


urlpatterns = [
    path('create/', views.create_space, name='create'),
    path('invite/', views.invite_members, name='invite'),
    path('find/', views.find_space, name='find'),
    path('check_slug/', views.check_slug, name='check_slug'),
    path('members/', views.get_members, name='get_members'),
    path('leader_board/', views.leader_board, name='leader_board'),
]
