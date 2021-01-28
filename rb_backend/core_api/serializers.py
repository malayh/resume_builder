from rest_framework import serializers

from .models import Contact_Details, Skills, Job_Profiles

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
        


    
