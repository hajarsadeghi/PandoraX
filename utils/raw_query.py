from django.db import connection

def raw_query(query, columns=None):
    cursor = connection.cursor()
    cursor.execute(query)
    queryset = cursor.fetchall()
    if columns:
        queryset = [dict(zip(columns, data)) for data in queryset]
    return queryset
