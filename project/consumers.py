import channels_graphql_ws
import channels, graphene
from .schema import schema


# def demo_middleware(next_middleware, root, info, *args, **kwds):
#     """Demo GraphQL middleware.
#     For more information read:
#     https://docs.graphene-python.org/en/latest/execution/middleware/#middleware
#     """
#     # Skip Graphiql introspection requests, there are a lot.
#     if (
#         info.operation.name is not None
#         and info.operation.name.value != "IntrospectionQuery"
#     ):
#         print("Demo middleware report")
#         print("    operation :", info.operation.operation)
#         print("    name      :", info.operation.name.value)

#     # Invoke next middleware.
#     return next_middleware(root, info, *args, **kwds)



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

    schema = schema
    # middleware = [demo_middleware]