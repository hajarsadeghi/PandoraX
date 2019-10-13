def get_full_name(first_name, last_name):
    return f"{'' if not first_name else first_name} {'' if not last_name else last_name}".strip()
