from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.db.models.functions import Concat
from django.db.models import Value as V, Q
from user.models import User
from space.models import Space, Member
from decorators import is_authenticated, get_space
from utils import user_serializer
from django.core.paginator import Paginator, InvalidPage
import json


@require_http_methods(['GET'])
@is_authenticated
@get_space
def get_members(request):
    try:
        pagin = json.loads(request.GET.get('pagin', 'false'))
        search = request.GET.get('search', False)
        exclude_myself = json.loads(request.GET.get('exclude_myself', 'false'))
        if pagin:
            pagin = {}
            pagin['data_limit'] = int(request.GET['data_limit'])
            pagin['page'] = int(request.GET['page'])
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad params"}, status=400)
    res = {}
    queryset = request.space.member_set.filter(active=True)
    if search:
        queryset = queryset.annotate(user__full_name=Concat('user__first_name', V(' '), 'user__last_name')).filter(Q(user__full_name__istartswith=search) | Q(user__last_name__istartswith=search)).distinct()
    if exclude_myself:
        queryset = queryset.exclude(user__id=request.user.id)
    queryset = queryset.values('user__id','user__first_name', 'user__last_name', 'user__profile_picture', 'job_title')
    if pagin:
        paginator = Paginator(queryset, pagin['data_limit'])
        res['max_page'] = paginator.num_pages
        try:
            queryset = paginator.page(pagin['page'])
        except InvalidPage:
            queryset = []
        res['data_limit'] = pagin['data_limit']
        res['page'] = pagin['page']


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
        res['data'].append(tmp_member)

    return JsonResponse(res, status=200, safe=False)
