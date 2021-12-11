from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Message
from .schema.subscriptions import OnNewMessage

@receiver(post_save, sender=Message)
def event_new_message(sender, instance: Message, **kwargs):
    if kwargs['created']:
        OnNewMessage.new_message(
            chat=instance.chat,
            message=instance,
            sender=instance.created_by,
        )