# Generated by Django 2.2.3 on 2019-11-02 16:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('space', '0003_auto_20191028_0746'),
        ('transaction', '0004_auto_20191028_0750'),
    ]

    operations = [
        migrations.RenameField(
            model_name='transaction',
            old_name='dest_uset',
            new_name='dest_user',
        ),
        migrations.RemoveField(
            model_name='transaction',
            name='sources',
        ),
        migrations.AddField(
            model_name='source',
            name='transaction',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='transaction.Transaction'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='transaction',
            name='space',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, to='space.Space'),
            preserve_default=False,
        ),
    ]
