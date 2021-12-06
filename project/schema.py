import graphene
from app.schema.queries import Query
from app.schema.mutations import Mutation as AppMutation
from app.schema.subscriptions import Subscription

import graphql_jwt

class Mutation(AppMutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    verify_token = graphql_jwt.Verify.Field()

schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)
