from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# Register your models here.

from .forms import RB_UserCreationForm, RB_UserChangeForm
from .models import RB_User

class RB_UserAdmin(UserAdmin):
    add_form = RB_UserCreationForm
    form = RB_UserChangeForm
    model = RB_User
    list_display = ('u_email', 'u_name','is_staff', 'is_active',)
    list_filter  = ('u_email', 'u_name','is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('u_email','u_name','password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('u_email','u_name','password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
    search_fields = ('u_email','u_name')
    ordering = ('u_email',)

admin.site.register(RB_User, RB_UserAdmin)

