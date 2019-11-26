from django.views import View
from django.http import JsonResponse
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
from django.db.models import Q, Sum
from utils import user_serializer
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class User(View):
    def get(self, request):
        sort_map = {
            'status': 'active',
            'earned_point_amount': 'earned_point_amount',
            'budget_point_amount': 'budget_point_amount',
        }
        try:
            sort_key = request.GET.get('sort', '')
            sort_key = f"{'-' if (sort_key.replace('-', '') in sort_map and sort_key.find('-') == 0) else ''}{sort_map.get(sort_key.replace('-', ''), '-id')}"
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad params"}, status=400)
        res = {}
        queryset = request.space.member_set.all().annotate(
            earned_point_amount=Sum('user__wallet__point_amount', filter=Q(user__wallet__space=request.space, user__wallet__type=Wallet.EARNED_TYPE), distict=True),
            budget_point_amoun=Sum('user__wallet__point_amount', filter=Q(user__wallet__space=request.space, user__wallet__type=Wallet.BUDGET_TYPE), distict=True),
        )
        queryset = queryset.values('user__id','user__first_name', 'user__last_name', 'user__profile_picture', 'job_title', 'active', 'user__email', 'earned_point_amount', 'budget_point_amount').order_by(sort_key)

        res['data'] = []
        for member in queryset:
            tmp_member = user_serializer(
                member['user__id'],
                request.space,
                member['user__first_name'],
                member['user__last_name'],
                member['user__profile_picture'],
                member['job_title']
            )
            tmp_member['earned_point_amount'] = member['earned_point_amount']
            tmp_member['budget_point_amount'] = member['budget_point_amount']
            tmp_member['status'] = 'active' if member['active'] else 'deactive'
            tmp_member['email'] = member['user__email']
            res['data'].append(tmp_member)

        return JsonResponse(res, status=200, safe=False)
