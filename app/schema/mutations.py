import graphene
from graphene import Boolean, String
from django.contrib.auth import authenticate
from channels.auth import login, logout
from asgiref.sync import async_to_sync
from graphene.types.objecttype import ObjectType
from graphene.types.scalars import Int

from app.models import ChatMessage, ChatRoom, User
from app.schema.subscriptions import OnNewChatMessage
from django.forms import ValidationError

from .types import UserType


class RegisterMutation(graphene.Mutation):
    ok = Boolean(required=True)
    user = graphene.Field(UserType, required=True)

    class Arguments:
        username = String(required=True)
        password = String(required=True)
        password2 = String(required=True)

    @staticmethod
    def mutate(self, info, username, password, password2):
        if password != password2:
            raise ValidationError({"password": "Passwords are not equal"})
        if User.objects.filter(username__icontains=username).exists():
            raise ValidationError({"username": "Username already exists"})
        user = User.objects.create_user(username=username, password=password)
        LoginMutation.mutate(self, info, username, password)
        return RegisterMutation(ok=True, user=user)


class LoginMutation(graphene.Mutation):
    ok = Boolean(required=True)
    user = graphene.Field(UserType, required=True)

    class Arguments:
        username = String(required=True)
        password = String(required=True)

    @staticmethod
    def mutate(self, info, username, password):
        user = authenticate(username=username, password=password)
        if user is None:
            raise ValidationError({"__all__": "User doesn\'t exists"})
        info.context.scope["session"] = info.context.session
        async_to_sync(login)(info.context.scope, user)
        info.context.session.save()
        return LoginMutation(ok=True, user=user)


class LogoutMutation(graphene.Mutation):
    ok = Boolean(required=True)

    @staticmethod
    def mutate(self, info):
        user: User = info.context.user
        if user.is_authenticated:
            info.context.scope["session"] = info.context.session
            async_to_sync(logout)(info.context.scope)
            info.context.session.save()
            return LogoutMutation(ok=True)
        return LogoutMutation(ok=False)


class SendChatMessageMutation(graphene.Mutation, name="SendChatMessagePayload"):
    ok = Boolean()

    class Arguments:
        chat_room = Int()
        message = String()

    @staticmethod
    def mutate(self, info, chat_room, message):
        # Use the username from the connection scope if authorized.
        # username = (
        #     info.context.user.username
        #     if info.context.user.is_authenticated
        #     else "Anonymous"
        # )
        user : User = info.context.user
        if not user.is_authenticated:
            return SendChatMessageMutation(ok=False)
        chat_room: ChatRoom = ChatRoom.objects.get(id=chat_room)
        message : ChatMessage = ChatMessage.objects.create(user=user, chat=chat_room, message=message, created_by=user, mod_by=user)
       # Notify subscribers.
        OnNewChatMessage.new_chat_message(chat_room=chat_room, message=message, sender=user)

        return SendChatMessageMutation(ok=True)


class Mutation(ObjectType):
    send_chat_message = SendChatMessageMutation.Field()
    login = LoginMutation.Field()
    logout = LogoutMutation.Field()
    register = RegisterMutation.Field()
