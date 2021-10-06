from typing import Tuple
from graphene import String, Int, Field
import graphene
from graphene.types.objecttype import ObjectType
import channels_graphql_ws
from graphene.types.scalars import Boolean
from app.models import ChatMessage, ChatRoom, User
from .types import ChatMessageType, ChatRoomType, UserType

class OnNewChatMessage(channels_graphql_ws.Subscription):
    sender = Field(UserType, required=True)
    chat_room = Field(ChatRoomType, required=True)
    message = Field(ChatMessageType, required=True)

    class Arguments:
        chat_room = graphene.ID(required=True)

    def subscribe(self, info, chat_room=None):
        chat_room_obj = ChatRoom.objects.only('id').get(id=chat_room)
        return [str(chat_room_obj.id)]

    def unsubscribe(self, info, chat_room=None):
        print('unsubscribed', chat_room, info.context.user)

    def publish(self, info, chat_room=None):
        """Called to prepare the subscription notification message."""

        # The `self` contains payload delivered from the `broadcast()`.
        new_msg_chatroom = self["chat_room"]
        new_msg_id = self["message"]
        new_msg_sender = self["sender"]

        # Avoid self-notifications.
        # if (
        #     info.context.user.is_authenticated
        #     and new_msg_sender == info.context.user.username
        # ):
        #     return OnNewChatMessage.SKIP
        message: ChatMessage = ChatMessage.objects.select_related('user', 'chat').get(id=new_msg_id)
        return OnNewChatMessage(
            chat_room=message.chat, message=message, sender=message.user
        )

    @classmethod
    def new_chat_message(cls, chat_room : ChatRoom, message : ChatMessage, sender : User):
        cls.broadcast(
            group=str(chat_room.id),
            payload={"chat_room": chat_room.id, "message": message.id, "sender": sender.username},
        )


class Subscription(ObjectType):
    on_new_chat_message = OnNewChatMessage.Field()

