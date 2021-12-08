from django.db import models
from django.contrib.auth.models import AbstractUser


class TimeModel(models.Model):
    class Meta:
        abstract = True
        ordering = ["-created_at"]

    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey('app.User', models.SET_NULL, related_name='+', null=True)
    mod_at = models.DateTimeField(auto_now=True)
    mod_by = models.ForeignKey('app.User', models.SET_NULL, related_name='+', null=True)


class User(AbstractUser):
    active_rooms = models.ManyToManyField('ChatRoom', related_name='active_users', blank=True)

    class Meta:
        ordering = ["username"]


class ChatRoom(TimeModel, models.Model):
    chat_name = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        ordering = ["chat_name"]


class ChatMessage(TimeModel, models.Model):
    chat = models.ForeignKey(ChatRoom, related_name="messages", on_delete=models.CASCADE)
    message = models.TextField()

    class Meta:
        ordering = ["created_at"]