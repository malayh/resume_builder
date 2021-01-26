from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import RB_User_Serializer

class Signup(APIView):
    def post(self,request,format=None):
        print(request.data)
        return Response(request.data)
