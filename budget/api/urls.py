from django.urls import path
from budget.api import views


urlpatterns = [
    path('', views.Budget.as_view(), name='crud'),
]
