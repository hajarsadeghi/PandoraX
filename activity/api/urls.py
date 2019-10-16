from django.urls import path, re_path
from django.db.models import Q
from activity.api import views


urlpatterns = [
    path('', views.Activity.as_view(), name='activity_crud'),
    path('<int:object_id>/like/', views.Like.as_view(),{'object_model':'activity.Activity', 'space_validator': 'space__id'}, name='like_crud'),
    path('<int:activity_id>/comment/', views.Comment.as_view(), name='like_crud'),
    re_path(r'^\d+/comment/(?P<object_id>\d+)/like/$', views.Like.as_view(),{'object_model':'activity.Comment', 'space_validator': 'activity__space__id'}, name='like_comment'),
    path('upload_media/', views.upload_media, name='upload_media'),
]
