from django.urls import path, include
from frontview import views
from django.views.generic import TemplateView
TemplateView.as_view(template_name='foo.html')

get_started_urls = [
    path('', TemplateView.as_view(template_name='get_started/index.html'), name='get_started'),
    path('create_space/', views.create_space, name='create_space'),
    path('find_space/', views.find_space, name='find_space'),
]

dashboard_urls = [
    path('', views.feed, name='feed'),
    path('budget/', views.budget, name='budget'),
    path('badge/', views.badge, name='badge'),
    path('profile/<int:user_id>/', views.profile, name='profile'),
]

urlpatterns = [
    path('', TemplateView.as_view(template_name='landing.html'), name='landing'),
    path('dashboard/<slug:space_slug>/', include((dashboard_urls, 'frontview'), namespace='dashboard')),
    path('login/', views.login, name='login'),
    path('verify_email', views.verify_email, name='verify_email'),
    path('get_started/', include((get_started_urls, 'frontview'), namespace='get_started')),
    path('multilanguage/', TemplateView.as_view(template_name='multilanguage.html'))
]
