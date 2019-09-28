from django.db import models
from django.db import transaction
from django.db.models import F
from django.contrib.contenttypes.models import ContentType

from transaction.models import Transaction
from space.models import Member
from user.models import User


class Budget(models.Model):
    name = models.CharField(max_length=100)
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)
    creator = models.ForeignKey('user.User', on_delete=models.CASCADE)
    point_amount = models.PositiveIntegerField()
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(auto_now_add=True, auto_now=False)

    class Meta:
        app_label = 'budget'

    def apply(self):
        user_content_type = ContentType.objects.get_for_model(User)
        queryset = self.space.member_set.all().values('id', 'user__id')
        transaction_list = []
        members = []
        for member in queryset:
            tmp_transaction = Transaction()
            tmp_transaction.type = Transaction.BUDGET_TYPE
            tmp_transaction.space = self.space
            tmp_transaction.source = self
            tmp_transaction.destination_content_type = user_content_type
            tmp_transaction.destination_object_id = member['user__id']
            tmp_transaction.point_amount = self.point_amount
            transaction_list.append(tmp_transaction)
            members.append(member['id'])
        print(transaction_list)
        with transaction.atomic():
            Member.objects.filter(id__in=members).update(budget_point_amount=F('budget_point_amount')+self.point_amount)
            Transaction.objects.bulk_create(transaction_list)
