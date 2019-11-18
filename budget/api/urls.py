from django.urls import path
from budget.api import views


urlpatterns = [
    path('', views.Budget.as_view(), name='budget'),
    path('<int:budget_id>/', views.BudgetObject.as_view(), name='budget_object'),
]
