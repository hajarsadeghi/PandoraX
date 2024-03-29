# Generated by Django 2.2.3 on 2019-10-13 11:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('space', '0002_auto_20190923_1402'),
        ('badge', '0003_auto_20190923_1402'),
    ]

    operations = [
        migrations.CreateModel(
            name='BadgeLog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('point_transferred', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('badge', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='badge.Badge')),
                ('from_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gived_badge', to=settings.AUTH_USER_MODEL)),
                ('space', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='space.Space')),
                ('to_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_badge', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
