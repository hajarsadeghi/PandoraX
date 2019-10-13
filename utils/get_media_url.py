from pandora_x.settings import MEDIA_URL
from os.path import join as path_join


def get_media_url(path):
    return path_join(MEDIA_URL, path) if path else None
