
class RequestMixin:

    @classmethod
    def get_form_kwargs(cls, root, info, **input):
        kwargs = super().get_form_kwargs(root, info, **input)
        return {
            'user': info.context.user,
            **kwargs,
        }