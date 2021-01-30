from rest_framework import serializers

from .models import *

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

class Resumes_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Resumes
        fields = ['id','title','profile','profile_summary_fk']
        fks = ["profile_summary_fk"]
        
class Resume_CD_S(serializers.ModelSerializer):
    class Meta:
        model = Resume_Contact_Detail_Map
        fields = ['position','contact_details_fk']
        fks = ['contact_details_fk']

class Resume_Skill_S(serializers.ModelSerializer):
    class Meta:
        model = Resume_Skill_Map
        fields = ['position','skill_fk']
        fks = ['skill_fk']

class Resume_PS_S(serializers.ModelSerializer):
    class Meta:
        model = Resume_Project_Summary_Map
        fields = ['position','project_summary_fk']
        fks = ['project_summary_fk']

class Resume_WH_S(serializers.ModelSerializer):
    class Meta:
        model = Resume_Work_History_Map
        fields = ['position','job_profile_fk']
        fks = ['job_profile_fk']

# TODO: Resume_Work_History_Project_Summary_Map has to be done differently
# TODO: Resume_Education_Project_Summary_Map

class Resume_Edu_S(serializers.ModelSerializer):
    class Meta:
        model = Resume_Education_Map
        fields = ['position','education_fk']
        fks = ['education_fk']


