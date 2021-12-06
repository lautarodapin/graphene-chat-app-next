from django.contrib.auth.forms import (
    UserCreationForm as DjangoUserCreationForm,
    UsernameField,
)
from .models import User, ChatMessage
from django import forms
from .schema.subscriptions import OnNewChatMessage
from core.forms import TimestampModelForm
class UserCreationForm(DjangoUserCreationForm):
    class Meta:
        model = User
        fields = ['username']
        field_classes = {'username': UsernameField}
        
class SendChatMessageForm(TimestampModelForm):
    class Meta:
        model = ChatMessage
        fields = ['message', 'user', 'chat']
        
    def save(self, commit=True):
        instance: ChatMessage = super().save(commit=commit)
        OnNewChatMessage.new_chat_message(
            chat_room=instance.chat,
            message=instance,
            sender=instance.user,
        )
        return instance