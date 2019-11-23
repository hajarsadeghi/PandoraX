# Generated by Django 2.2.3 on 2019-11-13 15:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('transaction', '0005_auto_20191102_1644'),
        ('badge', '0004_badgelog'),
    ]

    operations = [
        migrations.AddField(
            model_name='badgelog',
            name='point_amount',
            field=models.PositiveIntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='badgelog',
            name='transaction',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='transaction.Transaction'),
        ),
    ]