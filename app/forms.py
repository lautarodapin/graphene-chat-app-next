from django.contrib.auth.forms import (
    UserCreationForm as DjangoUserCreationForm,
    UsernameField,
)
from django.shortcuts import get_object_or_404
from .models import Chat, User, Message
from django import forms
from core.forms import TimestampModelForm, UserMixinForm


class UserCreationForm(DjangoUserCreationForm):
    class Meta:
        model = User
        fields = ['username']
        field_classes = {'username': UsernameField}


class SendMessageForm(TimestampModelForm):
    class Meta:
        model = Message
        fields = ['message', 'chat']


class JoinChatForm(UserMixinForm, forms.Form):
    chat = forms.CharField(required=True)
    join = forms.BooleanField(required=False)

    def clean(self):
        if not self.user.is_authenticated:
            raise forms.ValidationError('User is not authenticated')
        return self.cleaned_data

    def save(self):
        chat = self.cleaned_data.get('chat')
        join = self.cleaned_data.get('join')
        chat: Chat = get_object_or_404(Chat, pk=chat)
        if join:
            self.user.active_chats.add(chat)
        else:
            self.user.active_chats.remove(chat)
        return self.cleaned_data