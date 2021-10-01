import graphene
from graphene import Boolean, String
from django.contrib.auth import authenticate
from channels.auth import login, logout
from asgiref.sync import async_to_sync
from graphene.types.objecttype import ObjectType
from graphene.types.scalars import Int

from app.models import ChatMessage, ChatRoom, User
from app.schema.subscriptions import OnNewChatMessage

class Login(graphene.Mutation, name="LoginPayload"):  # type: ignore
    """Login mutation.
    Login implementation, following the Channels guide:
    https://channels.readthedocs.io/en/latest/topics/authentication.html
    """

    ok = Boolean(required=True)

    class Arguments:
        """Login request arguments."""

        username = String(required=True)
        password = String(required=True)

    def mutate(self, info, username, password):
        user = authenticate(username=username, password=password)
        if user is None:
            return Login(ok=False)
        info.context.scope["session"] = info.context.session
        async_to_sync(login)(info.context.scope, user)
        info.context.session.save()
        return Login(ok=True)


class SendChatMessage(graphene.Mutation, name="SendChatMessagePayload"):
    ok = Boolean()

    class Arguments:
        chat_room = Int()
        message = String()

    def mutate(self, info, chat_room, message):
        # Use the username from the connection scope if authorized.
        # username = (
        #     info.context.user.username
        #     if info.context.user.is_authenticated
        #     else "Anonymous"
        # )
        user : User = info.context.user
        if not user.is_authenticated:
            return SendChatMessage(ok=False)
        chat_room: ChatRoom = ChatRoom.objects.get(id=chat_room)
        message : ChatMessage = ChatMessage.objects.create(user=user, chat=chat_room, message=message, created_by=user, mod_by=user)
       # Notify subscribers.
        OnNewChatMessage.new_chat_message(chat_room=chat_room, message=message, sender=user)

        return SendChatMessage(ok=True)


class Mutation(ObjectType):
    send_chat_message = SendChatMessage.Field()
    login = Login.Field()

