from django.contrib import admin
from .models import ChatMessage, ChatRoom, User
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'get_active_rooms']

    def get_active_rooms(self, obj):
        return ', '.join(map(str, q.values_list('id', flat=True))) if (q:=obj.active_rooms.all()).exists() else '-'

@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    pass

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'message', 'chat', 'user', 'created_at']
