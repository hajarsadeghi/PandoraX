from django.urls import path
from activity.api import views


urlpatterns = [
    path('<int:activity_id>/like_toggle/', views.like_toggle, name='like_toggle'),
    path('<int:activity_id>/likes/', views.get_likes, name='get_likes'),
    path('upload_media/', views.upload_media, name='upload_media'),
    path('new/', views.new_activity, name='new_activity'),
    path('feed/', views.feed, name='feed'),
]
