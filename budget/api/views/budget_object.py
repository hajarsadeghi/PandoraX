from django.views import View
from django.http import JsonResponse
from budget.models import Budget
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class BudgetObject(View):
    def put(self, request, budget_id):
        update_fields = []
        try:
            budget = Budget.objects.get(id=budget_id, space=request.space)
            request_json = json.loads(request.body)
            if 'name' in request_json:
                budget.name = str(request_json['name'])
                update_fields.append('name')
            if 'point_amount' in request_json:
                budget.point_amount = int(request_json['point_amount'])
                update_fields.append('point_amount')
        except Budget.DoesNotExist:
            return JsonResponse({"message": "budget not found"}, safe=False, status=400)
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad json"}, status=400)
        if update_fields:
            budget.save(update_fields=update_fields)
            return JsonResponse({'message': 'updated'}, safe=False, status=200)
        return JsonResponse({}, safe=False, status=204)


    def delete(self, request, budget_id):
        try:
            budget = Budget.objects.get(id=budget_id, space=request.space)
        except Budget.DoesNotExist:
            return JsonResponse({"message": "budget not found"}, safe=False, status=400)
        budget.active = False
        budget.save(update_fields=['active'])
        return JsonResponse({'message': 'deleted'}, status=200)
