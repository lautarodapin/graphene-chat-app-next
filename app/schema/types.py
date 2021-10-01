from graphene_django import DjangoObjectType

from app.models import ChatMessage, ChatRoom, User


class ChatMessageType(DjangoObjectType):
    class Meta:
        model = ChatMessage


class UserType(DjangoObjectType):
    class Meta:
        model = User


class ChatRoomType(DjangoObjectType):
    class Meta:
        model = ChatRoom