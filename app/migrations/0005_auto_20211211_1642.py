# Generated by Django 3.2.7 on 2021-12-11 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_remove_chatmessage_user'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ChatRoom',
            new_name='Chat',
        ),
        migrations.RenameModel(
            old_name='ChatMessage',
            new_name='Message',
        ),
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['created_at']},
        ),
        migrations.RemoveField(
            model_name='user',
            name='active_rooms',
        ),
        migrations.AddField(
            model_name='user',
            name='active_chats',
            field=models.ManyToManyField(blank=True, related_name='active_users', to='app.Chat'),
        ),
    ]
