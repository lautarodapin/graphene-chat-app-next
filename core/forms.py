from django import forms

class UserMixinForm:
    def __init__(self, *args, **kwargs) -> None:
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)

class TimestampModelForm(UserMixinForm, forms.ModelForm):
    def save(self, **kwargs):
        if self.instance._state.adding:
            self.instance.created_by = self.user
        self.instance.updated_by = self.user
        return super().save(**kwargs)
