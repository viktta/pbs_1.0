# Generated by Django 3.1.4 on 2021-01-19 03:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0004_user_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='profile',
            field=models.ImageField(blank=True, upload_to=None),
        ),
    ]
