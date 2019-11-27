from django.views import View
from django.http import JsonResponse
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
from team.models import Team as TeamModel
from space.models import Member
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class Team(View):
    def post(self, request):
        "create team"
        try:
            request_json = json.loads(request.body)
            team_name = request_json['name']
            team_members = request_json['members']
            if team_members:
                team_members = Member.objects.filter(id__in=team_members, space=request.space, active=True).values_list('user_id', flat=True)
            team_lead = request_json.get('team_lead_id')
            if team_lead:
                team_lead = Member.objects.get(user_id=team_lead, space=request.space, active=True).user
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad json"}, status=400)
        except Member.DoesNotExist:
            return JsonResponse({"message": "team lead does not exists"}, status=400)

        team = TeamModel()
        team.name = team_name
        team.space = request.space
        team.team_lead = team_lead
        team.save()
        team.refresh_from_db()

        if team_members: team.members.set(team_members)

        return JsonResponse({'id': team.id}, status=201)
