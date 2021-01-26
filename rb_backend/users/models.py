from django.db import models
from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils.translation import gettext_lazy
from django.utils import timezone
from .managers import RB_User_Manager
# Create your models here.

class RB_User(AbstractBaseUser, PermissionsMixin):
    u_email = models.EmailField(gettext_lazy('email address'), unique=True)
    u_name = models.TextField(max_length=128)
    u_date_joined = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'u_email'
    REQUIRED_FIELDS = ['u_name']

    # has to set to some custom manager object
    objects = RB_User_Manager()

    def __str__(self):
        return self.u_name
