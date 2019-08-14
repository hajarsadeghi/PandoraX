import requests
from io import BytesIO

def get_profile_picture(strategy, details, user=None, *args, **kwargs):
    if not user:
        return
    social = kwargs.get('social')
    if social:
        if ('profile_picture' not in social.extra_data) or (user.profile_picture):
            return
        resp = requests.get(social.extra_data['profile_picture'])
        if resp.status_code == 200:
            file_name = f"{user.username}.jpg"
            user.profile_picture.save(file_name, BytesIO(resp.content))
            strategy.storage.user.changed(user)
