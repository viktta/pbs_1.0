from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime


class User(AbstractUser):
    None


class Posts(models.Model):
    title = models.CharField(max_length=191, blank=False)
    body = models.CharField(max_length=1000, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)


class Reply(models.Model):
    reply = models.CharField(max_length=191, blank=False)
    post = models.ForeignKey(Posts, on_delete=models.CASCADE, blank=False)
    date_added = models.DateTimeField(auto_now_add=True, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
