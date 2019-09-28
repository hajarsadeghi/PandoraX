from django.contrib.admin import ModelAdmin


class BudgetAdmin(ModelAdmin):
    list_display = ('name', 'space', 'creator', 'point_amount', 'created_date', 'active')
    list_filter = ('active', 'space')
    list_editable = ('active',)
    search_fields = ('name', 'space__name')
    actions = ['apply']

    def apply(self, request, queryset):
        for budget in queryset:
            budget.apply()
        self.message_user(request, "Selected budgets has been applied.")
    apply.short_description = "Apply selected budgets"
