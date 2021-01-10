from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass


class Posts(models.Model):
    title = models.CharField(max_length=191, blank=False)
    body = models.CharField(max_length=1000, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=False)
