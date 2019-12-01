from django.views import View
from django.http import JsonResponse
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
from space.models import Member
from team.models import Team
from utils import user_serializer
from django.utils import timezone
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
                'user__bio',
                'user__birth_date',
                'user__email',
                'job_title',
                'active',
                'joined_date'
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
        res['birth_date'] = timezone.localtime(user['user__birth_date']).isoformat()
        res['joined_date'] = timezone.localtime(user['joined_date']).isoformat()
        res['bio'] = user['user__bio']
        res['teams'] = teams
        return JsonResponse(res, status=200)


    def put(self, request, user_id):
        "edit user"
        member_update_fields = []
        modify_teams = False

        try:
            member = Member.objects.get(user_id=user_id, space=request.space)
            request_json = json.loads(request.body)
            if 'job_title' in request_json:
                member.job_title = request_json['job_title']
                member_update_fields.append('job_title')
            if 'teams' in request_json:
                new_teams = Team.objects.filter(id__in=request_json['members'], space=request.space, active=True).values_list('id', flat=True)
                modify_teams = True
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad json"}, status=400)
        except Member.DoesNotExist:
            return JsonResponse({"message": "team lead does not exists"}, status=400)

        if member_update_fields:
            member.save(update_fields=member_update_fields)

        if modify_teams:
            team_member_through_model = Team.members.through
            old_teams = team_member_through_model.objects.filter(member_id=member.id).values_list('team_id', flat=True)
            add_teams = list(set(new_teams) - set(old_teams))
            remove_teams = list(set(old_teams) - set(new_teams))
            team_member_through_model.objects.filter(member_id=member.id, team_id__in=remove_teams).delete()
            new_team_objs = [team_member_through_model(member_id=member.id, team_id=team_id) for team_id in add_teams]
            if new_team_objs:
                team_member_through_model.objects.bulk_create(new_team_objs)

        return JsonResponse({'message': 'updated'}, status=200)
