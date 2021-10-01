import graphene

from app.schema.queries import Query
from app.schema.mutations import Mutation
from app.schema.subscriptions import Subscription
schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)
