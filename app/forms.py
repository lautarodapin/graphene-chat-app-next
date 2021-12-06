from django.contrib.auth.forms import (
    UserCreationForm as DjangoUserCreationForm,
    UsernameField,
)
from django.shortcuts import get_object_or_404
from .models import ChatRoom, User, ChatMessage
from django import forms
from core.forms import TimestampModelForm, UserMixinForm


class UserCreationForm(DjangoUserCreationForm):
    class Meta:
        model = User
        fields = ['username']
        field_classes = {'username': UsernameField}


class SendChatMessageForm(TimestampModelForm):
    class Meta:
        model = ChatMessage
        fields = ['message', 'chat']


class JoinChatForm(UserMixinForm, forms.Form):
    chat_room = forms.IntegerField(required=True)
    join = forms.BooleanField(required=False)

    def clean(self):
        if not self.user.is_authenticated:
            raise forms.ValidationError('User is not authenticated')
        return self.cleaned_data

    def save(self):
        chat_room = self.cleaned_data.get('chat_room')
        join = self.cleaned_data.get('join')
        chat: ChatRoom = get_object_or_404(ChatRoom, pk=chat_room)
        if join:
            self.user.active_rooms.add(chat)
        else:
            self.user.active_rooms.remove(chat)
        return self.cleaned_data