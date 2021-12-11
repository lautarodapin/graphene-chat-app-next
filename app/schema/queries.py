from django.db.models.expressions import Value
import graphene
from graphene.types.objecttype import ObjectType
from graphene import String, List, Field
from graphene.types.structures import NonNull
from app.models import Message, Chat, User
from django.core.exceptions import ValidationError
from app.schema.types import (
    MessageType, ChatType, FiltersInput, UserType,
    MessageListType
)
from graphql.execution.base import ResolveInfo

class Query(ObjectType):
    hello = String()
    history = Field(MessageListType, chat=graphene.ID(required=True), filters=FiltersInput())
    user = Field(UserType)
    users = graphene.List(NonNull(UserType))
    chat = Field(ChatType, id=graphene.ID(required=True))
    chats = List(NonNull(ChatType),)

    def resolve_hello(self, info: ResolveInfo):
        return 'world'

    def resolve_history(self, info: ResolveInfo, chat, filters):
        queryset = (
            Message.objects.filter(chat=chat).order_by('-created_at')
        )
        return MessageListType(
            items=reversed(filters.paginate(queryset)),
            count=filters.count,
            has_more=filters.has_more,
        )

    def resolve_user(self, info: ResolveInfo):
        if info.context.user.is_authenticated:
            return info.context.user
        return None

    def resolve_chat(self, info: ResolveInfo, id):
        return Chat.objects.get(id=id)

    def resolve_chats(self, info: ResolveInfo):
        return Chat.objects.all()

    def resolve_users(self, info: ResolveInfo):
        return User.objects.exclude(id=info.context.user.id)