# Generated by Django 2.2.3 on 2019-10-28 07:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('budget', '0001_initial'),
        ('space', '0003_auto_20191028_0746'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('transaction', '0003_auto_20191028_0746'),
    ]

    operations = [
        migrations.CreateModel(
            name='Source',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('point_amount', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Wallet',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.PositiveSmallIntegerField(choices=[(0, 'Earned'), (1, 'Budget')])),
                ('point_amount', models.PositiveIntegerField(default=0)),
                ('expire', models.DateTimeField(blank=True, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('budget', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='budget.Budget')),
                ('space', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='space.Space')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_point_amount', models.PositiveIntegerField()),
                ('applied', models.BooleanField(default=False)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('dest_uset', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='earned_transaction', to=settings.AUTH_USER_MODEL)),
                ('source_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='spend_transaction', to=settings.AUTH_USER_MODEL)),
                ('sources', models.ManyToManyField(to='transaction.Source')),
            ],
        ),
        migrations.AddField(
            model_name='source',
            name='wallet',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transaction.Wallet'),
        ),
    ]
