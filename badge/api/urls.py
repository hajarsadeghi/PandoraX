from django.urls import path
from badge.api import views


urlpatterns = [
    path('', views.Badge.as_view(), name='badge'),
    path('<int:badge_id>/', views.BadgeObject.as_view(), name='badge_object'),
    path('icon/', views.Icon.as_view(), name='icon_crud'),
]
