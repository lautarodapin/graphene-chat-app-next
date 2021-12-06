from django.db.models.expressions import Value
import graphene
from graphene.types.objecttype import ObjectType
from graphene import String, List, Field
from graphene.types.structures import NonNull
from app.models import ChatMessage, ChatRoom, User

from app.schema.types import (
    ChatMessageType, ChatRoomType, FiltersInput, UserType,
    ChatMessageListType
)

class Query(ObjectType):
    hello = String()
    history = Field(ChatMessageListType, chat_room=graphene.ID(required=True), filters=FiltersInput())
    user = Field(UserType)
    users = graphene.List(NonNull(UserType))
    chat = Field(ChatRoomType, id=graphene.ID(required=True))
    chats = List(NonNull(ChatRoomType),)

    def resolve_hello(self, info):
        return 'world'

    def resolve_history(self, info, chat_room, filters):
        queryset = (
            ChatMessage.objects.filter(chat=chat_room)
        )
        return ChatMessageListType(
            items=reversed(filters.paginate(queryset)),
            count=filters.count,
            has_more=filters.has_more,
        )

    def resolve_user(self, info):
        if info.context.user.is_authenticated:
            return info.context.user
        return None

    def resolve_chat(self, info, id):
        return ChatRoom.objects.get(id=id)

    def resolve_chats(self, info):
        return ChatRoom.objects.all()

    def resolve_users(self, info):
        return User.objects.exclude(id=info.context.user.id)