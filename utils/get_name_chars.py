def get_name_chars(first_name, last_name):
    return f"{first_name[0] if first_name else ''}{last_name[0] if last_name else ''}".upper()
