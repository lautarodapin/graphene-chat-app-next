from typing import Tuple
from graphene import String, Int, Field
import graphene
from graphene.types.objecttype import ObjectType
import channels_graphql_ws
from graphene.types.scalars import Boolean
from app.models import Message, Chat, User
from .types import MessageType, ChatType, UserType

class OnNewMessage(channels_graphql_ws.Subscription):
    sender = Field(UserType, required=True)
    chat = Field(ChatType, required=True)
    message = Field(MessageType, required=True)

    class Arguments:
        chat = graphene.ID(required=True)

    def subscribe(self, info, chat=None):
        chat_obj = Chat.objects.only('id').get(id=chat)
        return [str(chat_obj.id)]

    def unsubscribe(self, info, chat=None):
        print('unsubscribed', chat, info.context.user)

    def publish(self, info, chat=None):
        """Called to prepare the subscription notification message."""

        # The `self` contains payload delivered from the `broadcast()`.
        new_msg_chat = self["chat"]
        new_msg_id = self["message"]
        new_msg_sender = self["sender"]

        # Avoid self-notifications.
        # if (
        #     info.context.user.is_authenticated
        #     and new_msg_sender == info.context.user.username
        # ):
        #     return OnNewChatMessage.SKIP
        message: Message = Message.objects.select_related('created_by', 'chat').get(id=new_msg_id)
        return OnNewMessage(
            chat=message.chat, message=message, sender=message.created_by
        )

    @classmethod
    def new_message(cls, chat : Chat, message : Message, sender : User):
        cls.broadcast(
            group=str(chat.id),
            payload={"chat": chat.id, "message": message.id, "sender": sender.username},
        )


class Subscription(ObjectType):
    on_new_message = OnNewMessage.Field()

