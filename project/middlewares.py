from django.conf import settings

class AuthenticationMiddleware(object):
    """
    Enforce authorization by query or mutation.
    Must configure settings.GRAPHQL_PUBLIC_FIELDS with the queries and
    mutations that should be allowed to run by anonymous users (usually login,
    logout, reset password, etc).
    """

    def resolve(self, next, root, info, **args):
        user = info.context.user
        public_fields = getattr(settings, 'GRAPHQL_PUBLIC_FIELDS', [])
        if not user.is_authenticated and info.path[0] not in public_fields:
            raise Exception(f'Unauthorized path: {".".join(info.path)}')
        return next(root, info, **args)