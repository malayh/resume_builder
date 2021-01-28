from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .models import Contact_Details, Skills, Job_Profiles
from .serializers import Contact_Details_Serializer, Skills_Serializer, Job_Profiles_Serializer


"""
API DOC:
    - /coreapi/contacts/
        - get   :get list
        - post  :create
    - /coreapi/contacts/<id>/
        - get   : returns if exist
        - put   : Update if exist
        - delete: delete if exist
    - /coreapi/skills/
        - get   :get list
        - post  :create
    - /coreapi/skills/<id>/
        - get   : returns if exist
        - put   : Update if exist
        - delete: delete if exist

"""

class ContactList(APIView):
    def get(self,request):
        _data = Contact_Details.objects.filter(user_fk=request.user).all()
        return Response(Contact_Details_Serializer(_data,many=True).data)

    def post(self,request):
        _s = Contact_Details_Serializer(data=request.data)
        _s.is_valid(raise_exception=True)

        contact_info = _s.save(user_fk=request.user)
        contact_info.save()

        return Response(_s.data)

class ContactDetail(APIView):
    def get_contact_by_id(self,id:int, user):
        """
        If object found where id=<id> and requesting user is the creator, returns object
        else returns None
        """
        try:
            contact = Contact_Details.objects.get(id=id)
        except Contact_Details.DoesNotExist:
            return None  
        if contact.user_fk != user:
            return None

        return contact


    def get(self,request, pk:int):
        contact = self.get_contact_by_id(pk,request.user)
        if not contact:
            return Response(data={"msg":"Forbidden"},status=status.HTTP_403_FORBIDDEN)

        return Response(Contact_Details_Serializer(contact).data)

    def delete(self,request,pk):
        contact = self.get_contact_by_id(pk,request.user)
        if not contact:
            return Response(data={"msg":"Forbidden"},status=status.HTTP_403_FORBIDDEN)

        contact.delete()
        return Response({"msg":"Deleted"})

    def put(self,request,pk):
        contact = self.get_contact_by_id(pk,request.user)
        if not contact:
            return Response(data={"msg":"Forbidden"},status=status.HTTP_403_FORBIDDEN)
            
        _s = Contact_Details_Serializer(data=request.data)
        _s.is_valid(raise_exception=True)
        contact.label = _s.validated_data["label"]
        contact.value = _s.validated_data["value"]
        contact.save()


        return Response({"msg":"Updated"})


class SkillList(APIView):
    def get(self,request):
        _data = Skills.objects.filter(user_fk=request.user).all()
        return Response(Skills_Serializer(_data,many=True).data)

    def post(self,request):
        _s = Skills_Serializer(data=request.data)
        _s.is_valid(raise_exception=True)

        skill = _s.save(user_fk=request.user)
        skill.save()

        return Response(_s.data)

class SkillDetail(APIView):
    def get_skill_by_id(self,id:int, user):
        """
        If object found where id=<id> and requesting user is the creator, returns object
        else returns None
        """
        try:
            skill = Skills.objects.get(id=id)
        except Skills.DoesNotExist:
            return None  
        if skill.user_fk != user:
            return None

        return skill

    def get(self,request, pk:int):
        skill = self.get_skill_by_id(pk,request.user)
        if not skill:
            return Response(data={"msg":"Forbidden"},status=status.HTTP_403_FORBIDDEN)

        return Response(Skills_Serializer(skill).data)

    def delete(self,request,pk):
        skill = self.get_skill_by_id(pk,request.user)
        if not skill:
            return Response(data={"msg":"Forbidden"},status=status.HTTP_403_FORBIDDEN)

        skill.delete()
        return Response({"msg":"Deleted"})
    
    def put(self,request,pk):
        skill = self.get_skill_by_id(pk,request.user)
        if not skill:
            return Response(data={"msg":"Forbidden"},status=status.HTTP_403_FORBIDDEN)
            
        _s = Skills_Serializer(data=request.data)
        _s.is_valid(raise_exception=True)
        skill.name = _s.validated_data["name"]
        skill.score = _s.validated_data["score"]
        skill.save()


        return Response({"msg":"Updated"}) 



