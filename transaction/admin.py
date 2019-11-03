from django.contrib import admin
from transaction.models import Transaction, Wallet

admin.site.register(Transaction)
admin.site.register(Wallet)
