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
from app.forms import JoinChatForm, SendChatMessageForm, UserCreationForm
from core.graphql import RequestMixin
class RegisterMutation(DjangoModelFormMutation):
    class Meta:
        form_class = UserCreationForm

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


class SendChatMessageMutation(RequestMixin, DjangoModelFormMutation):
    class Meta:
        form_class = SendChatMessageForm

class JoinChatMutation(RequestMixin, DjangoFormMutation):
    class Meta:
        form_class = JoinChatForm


class Mutation(ObjectType):
    send_chat_message = SendChatMessageMutation.Field()
    login = LoginMutation.Field()
    logout = LogoutMutation.Field()
    register = RegisterMutation.Field()
    join_chat = JoinChatMutation.Field()

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
