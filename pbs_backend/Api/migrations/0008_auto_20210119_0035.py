# Generated by Django 3.1.4 on 2021-01-19 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Api', '0007_posts_profile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='posts',
            name='profile',
            field=models.FileField(blank=True, upload_to=''),
        ),
    ]
