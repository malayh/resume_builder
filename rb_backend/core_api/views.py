from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from typing import ClassVar


from .models import *
from .serializers import *

"""
TODO:
    - Create generics for the List and detail view classes
    - Protect FKs from being used by someone other than the creator

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


class GenericList(APIView):
    MODEL_CLASS : ClassVar = None
    SERIALIZER_CLASS : ClassVar = None

    def __init__(self,*args,**kwargs):
        if not self.MODEL_CLASS or not self.SERIALIZER_CLASS:
            raise NotImplementedError("Set MODEL_CLASS and SERIALIZER_CLASS")

        super(GenericList,self).__init__(*args,**kwargs)

    def get(self,request):
        _data = self.MODEL_CLASS.objects.filter(user_fk=request.user).all()
        return Response(self.SERIALIZER_CLASS(_data,many=True).data)

    def post(self,request):
        _s = self.SERIALIZER_CLASS(data=request.data)
        _s.is_valid(raise_exception=True)

        if hasattr(self.SERIALIZER_CLASS.Meta,'fks'):
            assert isinstance(self.SERIALIZER_CLASS.Meta.fks,list)
            for fk in self.SERIALIZER_CLASS.Meta.fks:
                if fk in _s.validated_data and _s.validated_data[fk].user_fk != request.user:
                    return Response(status=status.HTTP_403_FORBIDDEN)


        obj = _s.save(user_fk=request.user)
        obj.save()

        return Response(_s.data)
    
class GenericDetail(APIView):
    MODEL_CLASS : ClassVar = None
    SERIALIZER_CLASS : ClassVar = None

    def get_object_by_id(self,id:int, user):
        """
        If object found where id=<id> and requesting user is the creator, returns (object,status)
        else returns (None,status)
        """
        try:
            obj = self.MODEL_CLASS.objects.get(id=id)
        except self.MODEL_CLASS.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj,status.HTTP_200_OK

    def get(self,request, pk:int):
        """
        Return object for given id
        """
        _obj,_code = self.get_object_by_id(pk,request.user)
        if not _obj:
            return Response(status=_code)

        return Response(self.SERIALIZER_CLASS(_obj).data)

    def delete(self,request,pk):
        _obj,_code = self.get_object_by_id(pk,request.user)
        if not _obj:
            return Response(status=_code)

        _obj.delete()
        return Response({"msg":"Deleted"})
    
    def put(self,request,pk):
        """
        Update existing object
        """
        _obj,_code = self.get_object_by_id(pk,request.user)
        if not _obj:
            return Response(status=_code)
            
        _s = self.SERIALIZER_CLASS(data=request.data)
        _s.is_valid(raise_exception=True)

        if hasattr(self.SERIALIZER_CLASS.Meta,'fks'):
            assert isinstance(self.SERIALIZER_CLASS.Meta.fks,list)
            for fk in self.SERIALIZER_CLASS.Meta.fks:
                if fk in _s.validated_data and _s.validated_data[fk].user_fk != request.user:
                    return Response(status=status.HTTP_403_FORBIDDEN)

        for field,value in _s.validated_data.items():
            setattr(_obj,field,value)        

        _obj.save()
        return Response({"msg":"Updated"}) 


class ContactList(GenericList):
    MODEL_CLASS = Contact_Details
    SERIALIZER_CLASS = Contact_Details_Serializer

class ContactDetail(GenericDetail):
    MODEL_CLASS = Contact_Details
    SERIALIZER_CLASS = Contact_Details_Serializer


class SkillList(GenericList):
    MODEL_CLASS = Skills
    SERIALIZER_CLASS = Skills_Serializer

class SkillDetail(GenericDetail):
    MODEL_CLASS = Skills
    SERIALIZER_CLASS = Skills_Serializer


class JobProfileList(GenericList):
    MODEL_CLASS = Job_Profiles
    SERIALIZER_CLASS = Job_Profiles_Serializer

class JobProfileDetail(GenericDetail):
    MODEL_CLASS = Job_Profiles
    SERIALIZER_CLASS = Job_Profiles_Serializer


class ProfileSummaryList(GenericList):
    MODEL_CLASS = Profile_Summaries
    SERIALIZER_CLASS = Profile_Summaries_Serializer

class ProfileSummaryDetail(GenericDetail):
    MODEL_CLASS = Profile_Summaries
    SERIALIZER_CLASS = Profile_Summaries_Serializer


class EducationList(GenericList):
    MODEL_CLASS = Educations
    SERIALIZER_CLASS = Educations_Serializer

class EducationDetail(GenericDetail):
    MODEL_CLASS = Educations
    SERIALIZER_CLASS = Educations_Serializer


class ProjectList(GenericList):
    MODEL_CLASS = Projects
    SERIALIZER_CLASS = Projects_Serializer

class ProjectDetail(GenericDetail):
    MODEL_CLASS = Projects
    SERIALIZER_CLASS = Projects_Serializer


class ProjectSummaryList(GenericList):
    MODEL_CLASS = Projects_Summaries
    SERIALIZER_CLASS = Projects_Summaries_Serializer

class ProjectSummaryDetail(GenericDetail):
    MODEL_CLASS = Projects_Summaries
    SERIALIZER_CLASS = Projects_Summaries_Serializer


class ResumeList(GenericList):
    MODEL_CLASS = Resumes
    SERIALIZER_CLASS = Resumes_Serializer

class ResumeDetail(GenericDetail):
    MODEL_CLASS = Resumes
    SERIALIZER_CLASS = Resumes_Serializer


# ----- Resume maping ------
# Functionalities: Get lists of mapping, create mapping, delete mapping

class GenericResumeMappingList(APIView):
    MAP_MODEL : ClassVar = None
    SERIALIZER_CLASS: ClassVar = None

    def __init__(self,*args,**kwargs):
        if not self.MAP_MODEL or not self.SERIALIZER_CLASS:
            raise NotImplementedError("Set MAP_MODEL and SERIALIZER_CLASS")

        super(GenericResumeMappingList,self).__init__(*args,**kwargs)


    def get_object_by_id(self,id:int,user,*,model_class):
        try:
            obj = model_class.objects.get(id=id)
        except model_class.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj, status.HTTP_200_OK
    
    def is_fk_owner_valid(self,_s : serializers.ModelSerializer, user):
        """
        Checks whether logged in user is the owner of the fk sent
        """
        if hasattr(self.SERIALIZER_CLASS.Meta,'fks'):
            assert isinstance(self.SERIALIZER_CLASS.Meta.fks,list)
            for fk in self.SERIALIZER_CLASS.Meta.fks:
                if fk in _s.validated_data and _s.validated_data[fk].user_fk != user:
                    return False
        return True

    def get(self,request,resume_id:int):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)

        objs = self.MAP_MODEL.objects.filter(resume_fk=_resume).all()

        return Response(self.SERIALIZER_CLASS(objs,many=True).data)

    def post(self,request,resume_id):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)

        _s = self.SERIALIZER_CLASS(data=request.data)
        _s.is_valid(raise_exception=True)
        if not self.is_fk_owner_valid(_s,request.user):
            return Response(status=status.HTTP_403_FORBIDDEN)

        obj = _s.save(resume_fk=_resume)
        obj.save()

        return Response(self.SERIALIZER_CLASS(obj).data)
    
class GenericResumeMappingDetail(APIView):
    MAP_MODEL : ClassVar = None
    SERIALIZER_CLASS: ClassVar = None
    MODEL_CLASS : ClassVar = None

    def __init__(self,*args,**kwargs):
        if not self.MAP_MODEL or not self.SERIALIZER_CLASS or not self.MODEL_CLASS:
            raise NotImplementedError("Set MAP_MODEL and SERIALIZER_CLASS")

        super(GenericResumeMappingDetail,self).__init__(*args,**kwargs)

    def get_object_by_id(self,id:int,user,*,model_class):
        try:
            obj = model_class.objects.get(id=id)
        except model_class.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj, status.HTTP_200_OK
    
    def delete(self,request,resume_id,cd_id):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)

        _cd, _status = self.get_object_by_id(cd_id,request.user,model_class=self.MODEL_CLASS)
        if not _cd:
            return Response(status=_status)

        try:
            Resume_Contact_Detail_Map.objects.get(contact_details_fk=_cd,resume_fk=_resume).delete()            
        except Resume_Contact_Detail_Map.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({"msg":"Deleted"})


class Resume_CD_List(GenericResumeMappingList):
    MAP_MODEL = Resume_Contact_Detail_Map
    SERIALIZER_CLASS = Resume_CD_S

class Resume_CD_Detail(APIView):
    def get_object_by_id(self,id:int,user,*,model_class):
        try:
            obj = model_class.objects.get(id=id)
        except model_class.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj, status.HTTP_200_OK

    def delete(self,request,resume_id,cd_id):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)

        _cd, _status = self.get_object_by_id(cd_id,request.user,model_class=Contact_Details)
        if not _cd:
            return Response(status=_status)

        try:
            objs = Resume_Contact_Detail_Map.objects.filter(contact_details_fk=_cd,resume_fk=_resume).all()
            for i in objs:
                i.delete()    
        except Resume_Contact_Detail_Map.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({"msg":"Deleted"})


class Resume_Skill_List(GenericResumeMappingList):
    MAP_MODEL = Resume_Skill_Map
    SERIALIZER_CLASS = Resume_Skill_S

class Resume_Skill_Detail(APIView):
    def get_object_by_id(self,id:int,user,*,model_class):
        try:
            obj = model_class.objects.get(id=id)
        except model_class.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj, status.HTTP_200_OK

    def delete(self,request,resume_id,s_id):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)

        _skl, _status = self.get_object_by_id(s_id,request.user,model_class=Skills)
        if not _skl:
            return Response(status=_status)

        try:
            objs = Resume_Skill_Map.objects.filter(skill_fk=_skl,resume_fk=_resume).all()
            for i in objs:
                i.delete()
        except Resume_Skill_Map.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({"msg":"Deleted"})


class Resume_PS_List(GenericResumeMappingList):
    MAP_MODEL = Resume_Project_Summary_Map
    SERIALIZER_CLASS = Resume_PS_S          
        
class Resume_PS_Detail(APIView):
    def get_object_by_id(self,id:int,user,*,model_class):
        try:
            obj = model_class.objects.get(id=id)
        except model_class.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj, status.HTTP_200_OK

    def delete(self,request,resume_id,ps_id):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)

        _ps, _status = self.get_object_by_id(ps_id,request.user,model_class=Projects_Summaries)
        if not _ps:
            return Response(status=_status)

        try:
            objs = Resume_Project_Summary_Map.objects.filter(project_summary_fk=_ps,resume_fk=_resume).all()
            for i in objs:
                i.delete()
        except Resume_Project_Summary_Map.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({"msg":"Deleted"})


class Resume_WH_List(GenericResumeMappingList):
    MAP_MODEL = Resume_Work_History_Map
    SERIALIZER_CLASS = Resume_WH_S

class Resume_WH_Detail(APIView):
    def get_object_by_id(self,id:int,user,*,model_class):
        try:
            obj = model_class.objects.get(id=id)
        except model_class.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj, status.HTTP_200_OK

    def delete(self,request,resume_id,jp_id):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)

        _jp, _status = self.get_object_by_id(jp_id,request.user,model_class=Job_Profiles)
        if not _jp:
            return Response(status=_status)

        try:
            objs = Resume_Work_History_Map.objects.filter(job_profile_fk=_jp,resume_fk=_resume).all()
            for i in objs:
                i.delete()
        except Resume_Work_History_Map.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({"msg":"Deleted"})


class Resume_Edu_List(GenericResumeMappingList):
    MAP_MODEL = Resume_Education_Map
    SERIALIZER_CLASS = Resume_Edu_S

class Resume_Edu_Detail(APIView):
    def get_object_by_id(self,id:int,user,*,model_class):
        try:
            obj = model_class.objects.get(id=id)
        except model_class.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj, status.HTTP_200_OK

    def delete(self,request,resume_id,edu_id):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)

        _edu, _status = self.get_object_by_id(edu_id,request.user,model_class=Educations)
        if not _edu:
            return Response(status=_status)

        try:
            objs = Resume_Education_Map.objects.filter(education_fk=_edu,resume_fk=_resume).all()
            for i in objs:
                i.delete()
        except Resume_Education_Map.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        return Response({"msg":"Deleted"})


class Resume_Sections_List(GenericResumeMappingList):
    MAP_MODEL = Resume_Content_Section_Positions
    SERIALIZER_CLASS = Resume_Section_S

    def post(self,request,resume_id):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)

        _s = self.SERIALIZER_CLASS(data=request.data)
        _s.is_valid(raise_exception=True)
        if not self.is_fk_owner_valid(_s,request.user):
            return Response(status=status.HTTP_403_FORBIDDEN)

        obj = _s.save(resume_fk=_resume,user_fk=request.user)
        obj.save()

        return Response(self.SERIALIZER_CLASS(obj).data)

class Resume_Section_Detail(APIView):
    def get_object_by_id(self,id:int,user,*,model_class):
        try:
            obj = model_class.objects.get(id=id)
        except model_class.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj, status.HTTP_200_OK

    def delete(self,request,resume_id,section_id):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)

        _section, _status = self.get_object_by_id(section_id,request.user,model_class=Resume_Content_Section_Positions)
        if not _section:
            return Response(status=_status)

        _section.delete()

        return Response({"msg":"Deleted"})