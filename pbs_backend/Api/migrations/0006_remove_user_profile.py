# Generated by Django 3.1.4 on 2021-01-19 03:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0005_auto_20210118_1901'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='profile',
        ),
    ]
