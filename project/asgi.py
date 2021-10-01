"""
ASGI config for project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
import channels
from channels.routing import URLRouter, ProtocolTypeRouter
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

from .consumers import MyGraphqlWsConsumer
from django.urls import path
app = get_asgi_application()

application = ProtocolTypeRouter(
    {
        "http": app,
        "websocket": AuthMiddlewareStack(
            URLRouter(
                [
                    path("graphql/", MyGraphqlWsConsumer.as_asgi())
                ]
            )
        ),
    }
)