from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from typing import ClassVar
import os
from django.http import FileResponse

from rb_backend.settings import PDF_STORE_DIR

from renderer import TemplateZhong
from .models import *
from .serializers import *


class GenericList(APIView):
    MODEL_CLASS : ClassVar = None
    SERIALIZER_CLASS : ClassVar = None
    allowed_filters = None

    def __init__(self,*args,**kwargs):
        if not self.MODEL_CLASS or not self.SERIALIZER_CLASS:
            raise NotImplementedError("Set MODEL_CLASS and SERIALIZER_CLASS")

        super(GenericList,self).__init__(*args,**kwargs)

    def get_filter(self,query_params):
        # query_params is requests.query_params
        _f = {}
        if not self.allowed_filters:
            return _f

        if not query_params:
            return _f

        for i in self.allowed_filters:
            q = query_params.get(i)
            if q:
                _f[i] = q

        return _f

    def get(self,request):
        _filters = self.get_filter(request.query_params)
        _data = self.MODEL_CLASS.objects.filter(user_fk=request.user).filter(**_filters)
        return Response(self.SERIALIZER_CLASS(_data,many=True).data)

    def post(self,request):
        _s = self.SERIALIZER_CLASS(data=request.data)
        _s.is_valid(raise_exception=True)

        if hasattr(self.SERIALIZER_CLASS.Meta,'fks'):
            assert isinstance(self.SERIALIZER_CLASS.Meta.fks,list)
            for fk in self.SERIALIZER_CLASS.Meta.fks:
                if fk in _s.validated_data and _s.validated_data[fk] and _s.validated_data[fk].user_fk != request.user:
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
                if fk in _s.validated_data and _s.validated_data[fk] and _s.validated_data[fk].user_fk != request.user:
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


class ProjectSummaryList(APIView):
    def get_object_by_id(self,id:int,user,*,model_class):
        try:
            obj = model_class.objects.get(id=id)
        except model_class.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj, status.HTTP_200_OK

    def get(self,request,project_id:int):
        _project, _status = self.get_object_by_id(project_id,request.user,model_class=Projects)
        if not _project:
            return Response(status=_status)

        objs = Projects_Summaries.objects.filter(project_fk=_project).all()
        return Response(Projects_Summaries_Serializer(objs,many=True).data)

    def post(self,request,project_id:int):
        _project, _status = self.get_object_by_id(project_id,request.user,model_class=Projects)
        if not _project:
            return Response(status=_status)

        _s = Projects_Summaries_Serializer(data=request.data)
        _s.is_valid(raise_exception=True)

        assert isinstance(Projects_Summaries_Serializer.Meta.fks,list)
        for fk in Projects_Summaries_Serializer.Meta.fks:
            if fk in _s.validated_data and _s.validated_data[fk].user_fk != request.user:
                return Response(status=status.HTTP_403_FORBIDDEN)

        obj = _s.save(project_fk=_project,user_fk=request.user)
        return Response(Projects_Summaries_Serializer(obj).data)
        
class ProjectSummaryDetail(GenericDetail):
    MODEL_CLASS = Projects_Summaries
    SERIALIZER_CLASS = Projects_Summaries_Serializer





class ResumeList(GenericList):
    MODEL_CLASS = Resumes
    SERIALIZER_CLASS = Resumes_S

class ResumeDetail(GenericDetail):
    MODEL_CLASS = Resumes
    SERIALIZER_CLASS = Resumes_S


class ResumeSubsectionsList(GenericList):
    MODEL_CLASS = Resume_Subsections
    SERIALIZER_CLASS = Resume_Subsections_S
    allowed_filters = ['id','resume_fk','position__gt','position__lt']

class ResumeSubsectionsDetail(GenericDetail):
    MODEL_CLASS = Resume_Subsections
    SERIALIZER_CLASS = Resume_Subsections_S



class ResumeContactMapList(GenericList):
    MODEL_CLASS = Contact_Resume_Map
    SERIALIZER_CLASS = Contact_Resume_Map_S
    allowed_filters = ['resume_fk','resume_subsection_fk']

class ResumeContactMapDetail(GenericDetail):
    MODEL_CLASS = Contact_Resume_Map
    SERIALIZER_CLASS = Contact_Resume_Map_S


class ResumeSkillMapList(GenericList):
    MODEL_CLASS = Skill_Resume_Map
    SERIALIZER_CLASS = Skill_Resume_Map_S
    allowed_filters = ['resume_fk','resume_subsection_fk']

class ResumeSkillMapDetail(GenericDetail):
    MODEL_CLASS = Skill_Resume_Map
    SERIALIZER_CLASS = Skill_Resume_Map_S


class ResumeEducationMapList(GenericList):
    MODEL_CLASS = Education_Resume_Map
    SERIALIZER_CLASS = Education_Resume_Map_S
    allowed_filters = ['resume_fk','resume_subsection_fk']

class ResumeEducationMapDetail(GenericDetail):
    MODEL_CLASS = Education_Resume_Map
    SERIALIZER_CLASS = Education_Resume_Map_S


class ResumeProjectMapList(GenericList):
    MODEL_CLASS = Project_Resume_Map
    SERIALIZER_CLASS = Project_Resume_Map_S
    allowed_filters = ['resume_fk','resume_subsection_fk']

class ResumeProjectMapDetail(GenericDetail):
    MODEL_CLASS = Project_Resume_Map
    SERIALIZER_CLASS = Project_Resume_Map_S


class ResumeProjectSummaryMapList(GenericList):
    MODEL_CLASS = Project_Summary_Resume_Map
    SERIALIZER_CLASS = Project_Summary_Resume_Map_S
    allowed_filters = ['resume_fk','resume_subsection_fk']

class ResumeProjectSummaryMapDetail(GenericDetail):
    MODEL_CLASS = Project_Summary_Resume_Map
    SERIALIZER_CLASS = Project_Summary_Resume_Map_S


class ResumeXPMapList(GenericList):
    MODEL_CLASS = Experiece_Resume_Map
    SERIALIZER_CLASS = Experiece_Resume_Map_S
    allowed_filters = ['resume_fk','resume_subsection_fk']

class ResumeXPMapDetail(GenericDetail):
    MODEL_CLASS = Experiece_Resume_Map
    SERIALIZER_CLASS = Experiece_Resume_Map_S

class RenderService(APIView):

    def get_object_by_id(self,id:int, user,*,model_class):
        """
        If object found where id=<id> and requesting user is the creator, returns (object,status)
        else returns (None,status)
        """
        try:
            obj = model_class.objects.get(id=id)
        except model_class.DoesNotExist:
            return None,status.HTTP_404_NOT_FOUND 
        if obj.user_fk != user:
            return None,status.HTTP_403_FORBIDDEN

        return obj,status.HTTP_200_OK


    def get_mapping(self,subsec,*,fk,map_model,data_model_serializer):
        _ret = []
        _map = map_model.objects.filter(resume_subsection_fk=subsec).order_by('position').all()
        for i in _map:
            _d = {'template_prop' : i.template_prop ,"map_id":i.id }
            _d.update(data_model_serializer(getattr(i,fk)).data)
            _ret.append(_d)
        
        return _ret

    def get_subsec_mappings(self, subsec):
        """
        arg: subsec is a Resume_Subsections object

        Returns a subsec dict with following props
        """
        _ret = {
            "title"             : subsec.title,
            "id"                : subsec.id,
            "position"          : subsec.position,
            "skills"            : self.get_mapping(subsec,fk="skill_fk",map_model=Skill_Resume_Map,data_model_serializer=Skills_Serializer),
            "contacts"          : self.get_mapping(subsec,fk="contact_fk",map_model=Contact_Resume_Map,data_model_serializer=Contact_Details_Serializer),
            "educations"        : self.get_mapping(subsec,fk="education_fk",map_model=Education_Resume_Map,data_model_serializer=Educations_Serializer),
            "projects"          : self.get_mapping(subsec,fk="project_fk",map_model=Project_Resume_Map,data_model_serializer=Projects_Serializer),
            "xps"               : self.get_mapping(subsec,fk="job_profile_fk",map_model=Experiece_Resume_Map,data_model_serializer=Job_Profiles_Serializer),
            "projectsummaries"  : self.get_mapping(subsec,fk="project_summary_fk",map_model=Project_Summary_Resume_Map,data_model_serializer=Projects_Summaries_Serializer)
        }

        return _ret

    def get(self,request, resume_id: int):
        _resume, _status = self.get_object_by_id(resume_id,request.user,model_class=Resumes)
        if not _resume:
            return Response(status=_status)
        
        _ret = {
            "username": request.user.u_name,
            "title" : _resume.title,
            "jobprofile" : _resume.job_profile_fk.profile if _resume.job_profile_fk else None,
            "profilesummary": _resume.profile_summary_fk.summary if _resume.profile_summary_fk else None
        }

        _subsecs = []
        
        for ss in Resume_Subsections.objects.filter(resume_fk=_resume).order_by('position').all():
            _subsecs.append(self.get_subsec_mappings(ss))

        _ret["subsections"] = _subsecs

        filename = f"{request.user.u_name.replace(' ','')}_{_resume.title.replace(' ','')}.pdf"
        pdfout = PDF_STORE_DIR.joinpath(filename).resolve()

        tz = TemplateZhong()
        tz.build_context(_ret)
        tz.render(pdfout)

        resume_file = open(pdfout,"r",encoding="utf-8")
        resp = FileResponse(resume_file, content_type='pdf')
        resp['Content-Length'] = os.path.getsize(pdfout)
        resp['Content-Disposition'] = f'attachment; filename="{filename}"'
        

        return resp