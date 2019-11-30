from django.views import View
from django.http import JsonResponse
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
from space.models import Member
from team.models import Team
from utils import user_serializer
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class UserObject(View):
    def get(self, request, user_id):
        try:
            user = Member.objects.values(
                'id',
                'user__id',
                'user__first_name',
                'user__last_name',
                'user__profile_picture',
                'bio',
                'birth_date',
                'job_title',
                'active',
                'joined_date'
                'user__email',
            ).get(user_id=user_id, space=request.space)
        except Member.DoesNotExist:
            return JsonResponse({"message": "user does not exists"}, status=400)

        teams = Team.objects.filter(members__id=user['id']).values_list('id', 'name')
        res = user_serializer(
            user['user__id'],
            request.space,
            user['user__first_name'],
            user['user__last_name'],
            user['user__profile_picture'],
            user['job_title']
        )
        res['status'] = 'active' if user['active'] else 'deactive'
        res['email'] = user['user__email']
        res['teams'] = teams
        return JsonResponse(res, status=200)
