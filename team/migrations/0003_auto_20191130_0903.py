# Generated by Django 2.2.3 on 2019-11-30 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0002_team_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='members',
            field=models.ManyToManyField(related_name='team', to='space.Member'),
        ),
    ]
