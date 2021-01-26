from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import RB_User

class RB_UserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = RB_User
        fields = ('u_email','u_name')

class RB_UserChangeForm(UserChangeForm):
    class Meta:
        model = RB_User
        fields = ('u_email','u_name')