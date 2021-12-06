from django import forms


class TimestampModelForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop('user', None)
        super().__init__(*args, **kwargs)
    
    def save(self, **kwargs):
        if self.instance._state.adding:
            self.instance.created_by = self.user
        self.instance.updated_by = self.user
        return super().save(**kwargs)
