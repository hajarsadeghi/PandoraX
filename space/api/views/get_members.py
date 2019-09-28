from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.db.models.functions import Concat
from django.db.models import Value as V
from user.models import User
from space.models import Space, Member
from decorators import is_authenticated, get_space
from django.core.paginator import Paginator
import json


@require_http_methods(['GET'])
@is_authenticated
@get_space
def get_members(request):
    try:
        pagin = json.loads(request.GET.get('pagin', 'false'))
        search = request.GET.get('search', False)
        if pagin:
            pagin = {}
            pagin['data_limit'] = int(request.GET['data_limit'])
            pagin['page'] = int(request.GET['page'])
    except (KeyError, ValueError, TypeError):
        return JsonResponse({"message": "bad params"}, status=400)
    res = {}
    queryset = request.space.member_set
    if search:
        queryset = queryset.annotate(user__full_name=Concat('user__first_name', V(' '), 'user__last_name')).filter(user__full_name__icontains=search)
    else:
        queryset = queryset.all()
    queryset = queryset.values('user__id','user__first_name', 'user__last_name', 'user__profile_picture')
    if pagin:
        paginator = Paginator(queryset, pagin['data_limit'])
        queryset = paginator.get_page(pagin['page'])
        res['data_limit'] = pagin['data_limit']
        res['page'] = pagin['page']
        res['max_page'] = paginator.num_pages

    res['data'] = []
    for member in queryset:
        tmp_member = {
            'id': member['user__id'],
            'full_name': f"{member['user__first_name']} {member['user__last_name']}",
            'profile_picture': member['user__profile_picture']
        }
        res['data'].append(tmp_member)

    return JsonResponse(res, status=200, safe=False)
