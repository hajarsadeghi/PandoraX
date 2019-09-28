from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

class Transaction(models.Model):
    DIRECT_TYPE = 0
    BUDGET_TYPE = 1
    RECOGNITION_TYPE = 2
    REDEEM_TYPE = 3

    type = models.SmallIntegerField(choices=((DIRECT_TYPE, 'Direct'),(BUDGET_TYPE, 'Budget'),(RECOGNITION_TYPE, 'Recognition'),(REDEEM_TYPE, 'Redeem')))
    space = models.ForeignKey('space.Space', on_delete=models.CASCADE)

    source_content_type = models.ForeignKey(ContentType, related_name='source_content_type', on_delete=models.CASCADE)
    source_object_id = models.PositiveIntegerField()
    source = GenericForeignKey('source_content_type', 'source_object_id')

    destination_content_type = models.ForeignKey(ContentType, related_name='destination_content_type', on_delete=models.CASCADE)
    destination_object_id = models.PositiveIntegerField()
    destination = GenericForeignKey('destination_content_type', 'destination_object_id')

    point_amount = models.PositiveIntegerField()

    class Meta:
        app_label = 'transaction'
