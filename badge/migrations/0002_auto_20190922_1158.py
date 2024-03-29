# Generated by Django 2.2.3 on 2019-09-22 11:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('badge', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='icon',
            name='is_global',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='icon',
            name='creator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='icon',
            name='space',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='space.Space'),
        ),
    ]
