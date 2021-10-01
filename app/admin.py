from django.contrib import admin
from .models import ChatMessage, ChatRoom, User
# Register your models here.
@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    pass
