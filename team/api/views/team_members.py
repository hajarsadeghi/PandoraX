from django.views.decorators.http import require_http_methods
from decorators import is_authenticated, get_space
from django.http import JsonResponse
from django.db.models.functions import Concat
from django.db.models import Q, Sum, Value as V
from django.core.paginator import Paginator, InvalidPage
from utils import user_serializer
from team.models import Team
import json


@require_http_methods(['GET'])
@is_authenticated
@get_space
def team_members(request, team_id):
    sort_map = {
        'status': 'active',
    }
    try:
        team = Team.objects.get(id=team_id, space=request.space)
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
        return JsonResponse({"message": "bad request"}, status=400)
    except Team.DoesNotExist:
        return JsonResponse({"message": "team does not exists"}, status=400)

    res = {}
    filters = []
    annotates = {}

    if search_full_name:
        annotates['user__full_name'] = Concat('user__first_name', V(' '), 'user__last_name')
        filters.append(Q(user__full_name__istartswith=search_full_name) | Q(user__last_name__istartswith=search_full_name))
    if search_email:
        filters.append(Q(user__email__istartswith=search_email))
    if status_filter:
        filters.append(Q(active=True if status_filter == 'active' else False))
    queryset = team.members.annotate(**annotates)

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
        tmp_member['status'] = 'active' if member['active'] else 'deactive'
        tmp_member['email'] = member['user__email']
        res['data'].append(tmp_member)

    return JsonResponse(res, status=200, safe=False)
