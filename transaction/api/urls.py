from django.urls import path
from transaction.api import views


urlpatterns = [
    path('wallet_status/', views.wallet_status, name='wallet_status'),
    path('payment_info/', views.payment_info, name='payment_info'),
]
