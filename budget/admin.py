from django.contrib import admin
from budget.models import Budget
from budget.admins import BudgetAdmin

admin.site.register(Budget, BudgetAdmin)
