from graphene.types.objecttype import ObjectType
from graphene import String, List, Field
from graphene.types.structures import NonNull
from app.models import ChatMessage, ChatRoom, User

from app.schema.types import ChatMessageType, ChatRoomType, UserType

class Query(ObjectType):
    hello = String()
    history = List(NonNull(ChatMessageType), chat_room=String())
    user = Field(UserType)
    users = Field(NonNull(UserType))
    chat = Field(ChatRoomType, id=String(required=True))
    chats = List(NonNull(ChatRoomType))

    def resolve_hello(self, info):
        return 'world'

    def resolve_history(self, info, chat_room: str):
        return ChatMessage.objects.filter(chat=chat_room).order_by('created_at')

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