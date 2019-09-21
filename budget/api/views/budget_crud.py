from django.views import View
from django.http import JsonResponse
from budget.models import Budget as BudgetModel
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class Budget(View):
    def get(self, request):
        budgets = BudgetModel.objects.filter(space=request.space).values('id', 'name', 'creator__id', 'creator__first_name', 'creator__last_name', 'creator__id', 'point_amount', 'active', 'created_date')
        resp = []
        for budget in budgets:
            tmp_budget = {
                "id":budget['id'],
                "name":budget['name'],
                "creator":{
                    "id":budget['id'],
                    "full_name":f"{'' if not budget['creator__first_name'] else budget['creator__first_name']} {'' if not budget['creator__last_name'] else budget['creator__last_name']}".strip()
                },
                "point_amount": budget['point_amount'],
                "active": budget['active'],
                "created_date":budget['created_date'].strftime('%Y/%m/%d %H:%M:%S')
            }
            resp.append(tmp_budget)
        return JsonResponse(resp, safe=False, status=200)


    def post(self, request):
        "create budget"
        try:
            request_json = json.loads(request.body)
            budget_name = request_json['name']
            budget_point_amount = int(request_json['point_amount'])
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad request"}, status=400)

        budget = BudgetModel()
        budget.name = budget_name
        budget.space = request.space
        budget.creator = request.user
        budget.point_amount = budget_point_amount
        budget.save()
        budget.refresh_from_db()

        return JsonResponse({'id': budget.id}, status=201)
