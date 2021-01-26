from rest_framework import serializers
from .models import RB_User

class RB_User_Serializer(serializers.ModelSerializer):
    class Meta:
        model = RB_User
        field =  fields = ('u_email', 'u_name')
