from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid
# Create your models here.

class TimeModel(models.Model):
    class Meta:
        abstract = True
        ordering = ["-created_at"]

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('app.User', models.CASCADE, related_name='+')
    mod_at = models.DateTimeField(auto_now=True)
    mod_by = models.ForeignKey('app.User', models.CASCADE, related_name='+')

class User(AbstractUser):
    active_rooms = models.ManyToManyField('ChatRoom', related_name='active_users', blank=True)

    class Meta:
        ordering = ["username"]


class ChatRoom(TimeModel, models.Model):
    class Meta:
        ordering = ["chat_name"]
    chat_name = models.CharField(max_length=50, null=True, blank=True)


class ChatMessage(TimeModel, models.Model):
    user = models.ForeignKey(User, related_name="messages", on_delete=models.SET_NULL, null=True, blank=False)
    chat = models.ForeignKey(ChatRoom, related_name="messages", on_delete=models.CASCADE)
    message = models.TextField()