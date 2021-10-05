from django.db.models.expressions import Value
from django.db.models.fields import BooleanField
import graphene
from graphene.types.structures import NonNull
from graphene_django import DjangoObjectType
from django.core.paginator import Paginator

from app.models import ChatMessage, ChatRoom, User


class PaginationType(graphene.Interface):
    count = graphene.Int()
    has_more = graphene.Boolean()


class ChatMessageType(DjangoObjectType):
    class Meta:
        model = ChatMessage
        interfaces = [PaginationType,]


class UserType(DjangoObjectType):
    class Meta:
        model = User


class ChatRoomType(DjangoObjectType):
    class Meta:
        model = ChatRoom

class FiltersInput(graphene.InputObjectType):
    page_size = graphene.Int(default_value=10)
    page = graphene.Int(required=True, default_value=1)

    def paginate(self, queryset):
        self.paginator = Paginator(queryset, per_page=self['page_size'])
        self.count = self.paginator.count
        self.page = self.paginator.page(self['page'])
        return self.page.object_list

    @property
    def has_more(self):
        return self.page.has_next()


class ChatMessageListType(graphene.ObjectType):
    items = graphene.List(NonNull(ChatMessageType), required=True)
    count = graphene.Int(required=True)
    has_more = graphene.Boolean(required=True)
