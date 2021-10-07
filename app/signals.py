from django.dispatch import Signal, receiver, dispatcher


join_chat_signal = Signal()

@receiver(signal=join_chat_signal)
def change_status(sender, **kwargs):
    print(kwargs)