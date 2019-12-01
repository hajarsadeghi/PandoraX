from django.views import View
from django.http import JsonResponse
from decorators import is_authenticated, get_space
from django.utils.decorators import method_decorator
from team.models import Team as Team
from space.models import Member
import json


@method_decorator(is_authenticated, name='dispatch')
@method_decorator(get_space, name='dispatch')
class TeamObject(View):
    def put(self, request, team_id):
        "edit team"
        update_fields = []
        modify_members = False
        try:
            team = Team.objects.get(id=team_id, space=request.space)
            request_json = json.loads(request.body)
            if 'name' in request_json:
                team.name = request_json['name']
                update_fields.append('name')
            if 'team_lead_id' in request_json:
                team.team_lead = Member.objects.get(user_id=request_json['team_lead_id'], space=request.space, active=True).user
                update_fields.append('team_lead')
            if 'members' in request_json:
                team_members = request_json['members']
                if team_members:
                    team_members = Member.objects.filter(id__in=team_members, space=request.space, active=True).values_list('id', flat=True)
                modify_members = True
        except (KeyError, ValueError, TypeError):
            return JsonResponse({"message": "bad json"}, status=400)
        except Team.DoesNotExist:
            return JsonResponse({"message": "team does not exists"}, status=400)
        except Member.DoesNotExist:
            return JsonResponse({"message": "team lead does not exists"}, status=400)

        team.save(update_fields=update_fields)
        if modify_members: team.members.set(team_members)

        return JsonResponse({'message': 'updated'}, status=200)
