from django.contrib import admin
from .models import Message, Chat, User
# Register your models here.

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'get_active_rooms']

    def get_active_rooms(self, obj):
        return ', '.join(map(str, q.values_list('id', flat=True))) if (q:=obj.active_rooms.all()).exists() else '-'

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    pass

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'message', 'chat', 'created_by', 'created_at']
    list_filter = ['chat']