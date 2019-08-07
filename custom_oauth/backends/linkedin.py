"""
LinkedIn OAuth1 and OAuth2 backend, docs at:
    https://python-social-auth.readthedocs.io/en/latest/backends/linkedin.html
"""
from social_core.backends.linkedin import LinkedinOAuth2 as OrgLinkedinOAuth2
from dictor import dictor
import time

class LinkedinOAuth2(OrgLinkedinOAuth2):
    def extra_data(self, user, uid, response, details=None, *args, **kwargs):
        """Return default extra data to store in extra_data field"""
        data = {
            # store the last time authentication toke place
            'auth_time': int(time.time())
        }
        extra_data_entries = []
        if self.GET_ALL_EXTRA_DATA or self.setting('GET_ALL_EXTRA_DATA', False):
            extra_data_entries = response.keys()
        else:
            extra_data_entries = (self.EXTRA_DATA or []) + self.setting('EXTRA_DATA', [])
        for entry in extra_data_entries:
            if not isinstance(entry, (list, tuple)):
                entry = (entry,)
            size = len(entry)
            if size >= 1 and size <= 3:
                if size == 3:
                    name, alias, discard = entry
                elif size == 2:
                    (name, alias), discard = entry, False
                elif size == 1:
                    name = alias = entry[0]
                    discard = False
                value = dictor(response, name) or dictor(details, name) or dictor(details, alias)
                if discard and not value:
                    continue
                data[alias] = value
        data['token_type'] = response.get('token_type') or kwargs.get('token_type')
        data['access_token'] = response.get('access_token', '') or kwargs.get('access_token')
        return data
