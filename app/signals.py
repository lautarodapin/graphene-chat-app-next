from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import ChatMessage
from .schema.subscriptions import OnNewChatMessage

@receiver(post_save, sender=ChatMessage)
def event_new_message(sender, instance, **kwargs):
    if kwargs['created']:
        OnNewChatMessage.new_chat_message(
            chat_room=instance.chat,
            message=instance,
            sender=instance.created_by,
        )