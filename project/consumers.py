import channels_graphql_ws
import channels, graphene
from .schema import schema
import json
from app.signals import join_chat_signal

def demo_middleware(next_middleware, root, info, *args, **kwds):
    """Demo GraphQL middleware.
    For more information read:
    https://docs.graphene-python.org/en/latest/execution/middleware/#middleware
    """
    # Skip Graphiql introspection requests, there are a lot.
    if (
        info.operation.name is not None
        and info.operation.name.value != "IntrospectionQuery"
    ):
        print("Demo middleware report")
        print("    operation :", info.operation.operation)
        print("    name      :", info.operation.name.value)
    # Invoke next middleware.
    return next_middleware(root, info, *args, **kwds)



class MyGraphqlWsConsumer(channels_graphql_ws.GraphqlWsConsumer):
    """Channels WebSocket consumer which provides GraphQL API."""

    async def on_connect(self, payload):
        """Handle WebSocket connection event."""
        print(payload)
        # Use auxiliary Channels function `get_user` to replace an
        # instance of `channels.auth.UserLazyObject` with a native
        # Django user object (user model instance or `AnonymousUser`)
        # It is not necessary, but it helps to keep resolver code
        # simpler. Cause in both HTTP/WebSocket requests they can use
        # `info.context.user`, but not a wrapper. For example objects of
        # type Graphene Django type `DjangoObjectType` does not accept
        # `channels.auth.UserLazyObject` instances.
        # https://github.com/datadvance/DjangoChannelsGraphqlWs/issues/23
        self.scope["user"] = await channels.auth.get_user(self.scope)

    async def websocket_receive(self, message):
        text = json.loads(message.get('text'))

        if text and isinstance(text, dict):
            type = text.get('type')
            id = text.get('id')
            if type and id:
                kwargs = dict(sender='leave', id=id, type=type, user=self.scope['user'].id)
                print(f'{kwargs}')
                join_chat_signal.send(**kwargs)

        print(f'Websocket receive {message=}')
        return await super().websocket_receive(message)

    async def disconnect(self, code):
        print(f'Disconnect {code=}')
        return await super().disconnect(code)
        
    async def websocket_disconnect(self, message):
        print(f'Websocket disconnect {message=}')
        return await super().websocket_disconnect(message)

    schema = schema
    middleware = [demo_middleware]