from django.views import View
from django.http import JsonResponse
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
from django.db.models.functions import Concat
from django.db.models import Q, Sum, Value as V
from django.core.paginator import Paginator, InvalidPage
from utils import user_serializer
from datetime import date
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
            pagin = json.loads(request.GET.get('pagin', 'false'))
            if pagin:
                pagin = {}
                pagin['data_limit'] = int(request.GET['data_limit'])
                pagin['page'] = int(request.GET['page'])
            sort_key = request.GET.get('sort', '')
            sort_key = f"{'-' if (sort_key.replace('-', '') in sort_map and sort_key.find('-') == 0) else ''}{sort_map.get(sort_key.replace('-', ''), '-id')}"
            search_email = request.GET.get('email')
            search_full_name = request.GET.get('full_name')
            status_filter = request.GET.get('status')
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad params"}, status=400)

        res = {}
        filters = []
        annotates = {
            'earned_point_amount' : Sum('user__wallet__point_amount', filter=Q(user__wallet__space=request.space, user__wallet__type=Wallet.EARNED_TYPE), distict=True),
            'budget_point_amoun' : Sum('user__wallet__point_amount', filter=Q(user__wallet__space=request.space, user__wallet__type=Wallet.BUDGET_TYPE), distict=True),
        }

        if search_full_name:
            annotates['user__full_name'] = Concat('user__first_name', V(' '), 'user__last_name')
            filters.append(Q(user__full_name__istartswith=search_full_name) | Q(user__last_name__istartswith=search_full_name))
        if search_email:
            filters.append(Q(user__email__istartswith=search_email))
        if status_filter:
            filters.append(Q(active=True if status_filter == 'active' else False))
        queryset = request.space.member_set.annotate(**annotates)

        if filters:
            queryset = queryset.filter(*filters)

        queryset = queryset.values(
            'user__id',
            'user__first_name',
            'user__last_name',
            'user__profile_picture',
            'job_title',
            'active',
            'user__email',
            'earned_point_amount',
            'budget_point_amount'
        ).order_by(sort_key).distinct()

        if pagin:
            paginator = Paginator(queryset, pagin['data_limit'])
            res['max_page'] = paginator.num_pages
            try:
                queryset = paginator.page(pagin['page'])
            except InvalidPage:
                queryset = []
            res['data_limit'] = pagin['data_limit']
            res['page'] = pagin['page']
            res['total_count'] = paginator.count

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

    def post(self, request):
        "create user"
        try:
            request_json = json.loads(request.body)
            email = request_json['email']
            first_name = request_json.get('first_name')
            last_name = request_json.get('last_name')
            job_title = request_json.get('job_title')
            birth_date = request_json.get('birth_date')
            if birth_date: birth_date = date.strptime(birth_date, '%Y/%m/%d').date()
            teams = request_json.get('teams', [])
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad request"}, status=400)

        if Member.objects.filter(user__email__iexact=email, space=request.space).exists():
            return JsonResponse({"message": "this user alreaady exists in this space"}, status=400)

        user = User.objects.get_or_create(defaults={
            'email':email,
            'username':email,
            'first_name':first_name,
            'last_name':last_name,
            'birth_date': birth_date
        }, email__iexact=email)[0]
        member = Member.objects.create(user=user, space=request.space, job_title=job_title)
        Wallet.objects.create(user=user, space=request.space, type=Wallet.EARNED_TYPE)

        team_member_through_model = Team.members.through
        if teams:
            teams = Team.objects.filter(id__in=teams, space=request.space, active=True).values_list('id', flat=True)
            team_objs = [team_member_through_model(member_id=member.id, team_id=team_id) for team_id in teams]
            if team_objs:
                team_member_through_model.objects.bulk_create(team_objs)
        return JsonResponse({'id': user.id}, status=201)
