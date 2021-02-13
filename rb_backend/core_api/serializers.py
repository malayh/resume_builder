from rest_framework import serializers
from .models import *
from rest_framework.exceptions import ErrorDetail, ValidationError

# TODO: Resume_Work_History_Project_Summary_Map has to be done differently
# TODO: Resume_Education_Project_Summary_Map

class Contact_Details_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Contact_Details
        fields = ['id','label','value']

class Skills_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = ['id','name','score']

class Job_Profiles_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Job_Profiles
        fields = ['id','profile','company','location','start_time','end_time','is_current']
     
class Profile_Summaries_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Profile_Summaries
        fields = ['id','name','summary']

class Educations_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Educations
        fields = ['id','degree','provider','start_time','end_time','is_current']

class Projects_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ['id','title','story','keywords']

class Projects_Summaries_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Projects_Summaries
        fields = ['id','project_fk','summary']
        fks = ["project_fk"]


class Resumes_S(serializers.ModelSerializer):
    class Meta:
        model = Resumes
        fields = ['id','title','job_profile_fk','profile_summary_fk']
        fks = ['job_profile_fk','profile_summary_fk']

class Resume_Subsections_S(serializers.ModelSerializer):
    class Meta:
        model = Resume_Subsections
        fields = ['id','resume_fk','title','position']
        fks = ['resume_fk']


resume_map_common_fields = ['id','resume_fk','resume_subsection_fk','position','template_prop']
resume_map_fk_fields = ['resume_fk','resume_subsection_fk']

class Contact_Resume_Map_S(serializers.ModelSerializer):
    class Meta:
        model = Contact_Resume_Map
        fields = resume_map_common_fields + ['contact_fk']
        fks = resume_map_fk_fields + ['contact_fk']

class Skill_Resume_Map_S(serializers.ModelSerializer):
    class Meta:
        model = Skill_Resume_Map
        fields = resume_map_common_fields + ['skill_fk']
        fks = resume_map_fk_fields + ['skill_fk']

class Education_Resume_Map_S(serializers.ModelSerializer):
    class Meta:
        model = Education_Resume_Map
        fields = resume_map_common_fields + ['education_fk']
        fks = resume_map_fk_fields + ['education_fk']

class Project_Resume_Map_S(serializers.ModelSerializer):
    class Meta:
        model = Project_Resume_Map
        fields = resume_map_common_fields + ['project_fk']
        fks = resume_map_fk_fields + ['project_fk']

class Project_Summary_Resume_Map_S(serializers.ModelSerializer):
    class Meta:
        model = Project_Summary_Resume_Map
        fields = resume_map_common_fields + ['project_summary_fk']
        fks = resume_map_fk_fields + ['project_summary_fk']

