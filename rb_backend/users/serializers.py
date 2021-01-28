from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from .models import RB_User

class RB_User_Serializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField()
    password = serializers.CharField(write_only=True,required=True)

    def create(self,validated_data) -> RB_User:
        """
        Raises error on invalid password
        """
        validate_password(validated_data["password"])
        return RB_User(
            is_active=True,
            is_superuser=False,
            is_staff=False,
            u_email=validated_data["email"],
            u_name=validated_data["name"],
            password=make_password(validated_data["password"])
        )