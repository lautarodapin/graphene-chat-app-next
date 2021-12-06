from django.dispatch import Signal, receiver, dispatcher
from django.db.models.signals import post_save

from .models import ChatMessage
from .schema.subscriptions import OnNewChatMessage
join_chat_signal = Signal()

@receiver(signal=join_chat_signal)
def change_status(sender, **kwargs):
    print(kwargs)


@receiver(post_save, sender=ChatMessage)
def event_new_message(sender, instance, **kwargs):
    if kwargs['created']:
        OnNewChatMessage.new_chat_message(
            chat_room=instance.chat,
            message=instance,
            sender=instance.created_by,
        )