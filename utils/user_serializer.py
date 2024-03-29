from utils import get_media_url, get_full_name, get_name_chars
from django.urls import reverse


def user_serializer(id, space, first_name, last_name, profile_picture, job_title=False):
    tmp_user = {
        'id': id,
        'full_name': get_full_name(first_name, last_name),
        'name_chars': get_name_chars(first_name, last_name),
        'profile_picture': get_media_url(profile_picture),
        'url': reverse('frontview:dashboard:profile', args=[space.slug, id])
    }
    if job_title != False: tmp_user['job_title'] = job_title
    return tmp_user
