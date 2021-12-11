from django.db.models.expressions import Value
from django.db.models.fields import BooleanField
import graphene
from graphene.types.structures import NonNull
from graphene_django import DjangoObjectType
from django.core.paginator import Paginator

from app.models import Message, Chat, User


class PaginationType(graphene.Interface):
    count = graphene.Int()
    has_more = graphene.Boolean()


class MessageType(DjangoObjectType):
    class Meta:
        model = Message
        interfaces = [PaginationType,]


class UserType(DjangoObjectType):
    class Meta:
        model = User


class ChatType(DjangoObjectType):
    last_message = graphene.Field(MessageType)

    class Meta:
        model = Chat

    def resolve_last_message(self, info):
        return self.messages.last()

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


class MessageListType(graphene.ObjectType):
    items = graphene.List(NonNull(MessageType), required=True)
    count = graphene.Int(required=True)
    has_more = graphene.Boolean(required=True)
