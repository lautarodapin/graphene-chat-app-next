from graphene.types.objecttype import ObjectType
from graphene import String, List, Field
from graphene.types.structures import NonNull
from app.models import ChatMessage, ChatRoom

from app.schema.types import ChatMessageType, ChatRoomType, UserType

class Query(ObjectType):
    """Root GraphQL query."""

    hello = String()
    history = List(NonNull(ChatMessageType), chat_room=String())
    user = Field(UserType)
    chats = List(ChatRoomType)

    def resolve_hello(self, info):
        return 'world'

    def resolve_history(self, info, chat_room: str):
        """Return chat history."""
        return ChatMessage.objects.filter(chat=chat_room)

    def resolve_user(self, info):
        """Provide currently logged in user."""
        if info.context.user.is_authenticated:
            return info.context.user
        return None

    def resolve_chats(self, info):
        return ChatRoom.objects.all()