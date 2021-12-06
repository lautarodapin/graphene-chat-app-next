import graphene
from graphene import Boolean, String
from django.contrib.auth import authenticate
from channels.auth import login, logout
from asgiref.sync import async_to_sync
from graphene.types.objecttype import ObjectType
from graphene.types.scalars import Int
from graphene_django.forms.mutation import DjangoModelFormMutation, DjangoFormMutation
from graphene_django.types import ErrorType
from django.contrib.auth import login as django_login, logout as django_logout

from app.models import ChatMessage, ChatRoom, User
from app.schema.subscriptions import OnNewChatMessage
from django.forms import ValidationError
from django.contrib.auth.forms import (
    UserCreationForm as DjangoUserCreationForm,
    AuthenticationForm as DjangoAuthenticationForm,
)
from .types import UserType
import graphql_jwt

class RegisterMutation(graphene.Mutation):
    ok = Boolean(required=True)
    user = graphene.Field(UserType, required=True)

    class Arguments:
        username = String(required=True)
        password = String(required=True)
        password2 = String(required=True)

    @staticmethod
    def mutate(self , info, username, password, password2):
        if password != password2:
            raise ValidationError({"password": "Passwords are not equal"})
        if User.objects.filter(username__icontains=username).exists():
            raise ValidationError({"username": "Username already exists"})
        user = User.objects.create_user(username=username, password=password)
        LoginMutation.mutate(self, info, username, password)

        return RegisterMutation(ok=True, user=user)


class LoginMutation(graphene.Mutation):
    user = graphene.Field(UserType)
    errors = graphene.List(ErrorType)

    class Arguments:
        username = String(required=True)
        password = String(required=True)

    @staticmethod
    def mutate(self , info, username, password):
        form = DjangoAuthenticationForm(data={'username': username, 'password': password})
        if not form.is_valid():
            return LoginMutation(errors=ErrorType.from_errors(form.errors))
        user = form.get_user()
        info.context.scope["session"] = info.context.session
        async_to_sync(login)(info.context.scope, user)
        django_login(info.context, user=user)
        info.context.session.save()

        return LoginMutation(ok=True, user=user)


class LogoutMutation(graphene.Mutation):
    ok = Boolean(required=True)

    @staticmethod
    def mutate(self , info):
        user: User = info.context.user
        if user.is_authenticated:
            info.context.scope["session"] = info.context.session
            async_to_sync(logout)(info.context.scope)
            django_logout(info.context)
            info.context.session.save()
            return LogoutMutation(ok=True)
        return LogoutMutation(ok=False)


class SendChatMessageMutation(graphene.Mutation):
    ok = Boolean()

    class Arguments:
        chat_room = graphene.ID(required=True)
        message = graphene.String(required=True)

    @staticmethod
    def mutate(self , info, chat_room, message):
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


class JoinChatMutation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        chat_room = graphene.ID(required=True)
        join = graphene.Boolean(required=True)

    @staticmethod
    def mutate(self, info, chat_room, join):
        user: User = info.context.user
        if not user.is_authenticated:
            return JoinChatMutation(ok=False)
        chat: ChatRoom = ChatRoom.objects.get(id=chat_room)
        if join:
            user.active_rooms.add(chat_room)
        else:
            user.active_rooms.remove(chat_room)
        return JoinChatMutation(ok=True)


class Mutation(ObjectType):
    send_chat_message = SendChatMessageMutation.Field()
    login = LoginMutation.Field()
    logout = LogoutMutation.Field()
    register = RegisterMutation.Field()
    join_chat = JoinChatMutation.Field()

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
