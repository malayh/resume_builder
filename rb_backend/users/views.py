from django.shortcuts import render
from django.db.utils import IntegrityError
from django.core.exceptions import ValidationError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .serializers import RB_User_Serializer
from .models import RB_User
from django.contrib.auth import authenticate

class Signup(APIView):
    """
    TODO:
        on succcessful signup, login
    """

    permission_classes = [AllowAny]
    def post(self,request,format=None):
        serializer = RB_User_Serializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        try:
            user = serializer.save()
        except ValidationError as e:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE,data={"msg":"".join(e)})

        try:
            user.save()
        except IntegrityError as e:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE,data={"msg":"User already exist"})
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"msg":"Unknown error"})        

        return Response({"msg":"Success"})

class Auth(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"msg":"Provide both email and password"})

        user = authenticate(request=request, username=email,password=password)
        
        if not user:
            return Response(data={'msg': 'Invalid Credentials'},status=status.HTTP_404_NOT_FOUND)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({"msg":"Logged In", "token":token.key , "id":user.id})

class Logout(APIView):
    def post(self, request, *args, **kwargs):
        request.user.auth_token.delete()
        return Response(data={"msg":"Logged out"},status=status.HTTP_200_OK)


class UserInfo(APIView):
    def get(self,request):
        _d = {
            'email' : request.user.u_email,
            'name': request.user.u_name
        }
        return Response(_d)

    def put(self,request):
        name = request.data['name'] if 'name' in request.data else None
        if not name:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        _user = request.user
        if name:
            _user.u_name = name

        _user.save()
        return Response({"msg":"Updated"})

class Test(APIView):
    def get(self,request,*args,**kwargs):
        return Response({"msg":"Working"})

        
