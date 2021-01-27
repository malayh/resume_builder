from django.db import models
from users.models import RB_User

# Create your models here.
class Contact_Details(models.Model):
    owner = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    label = models.CharField()
    value = models.CharField()

class Skills(models.Model):
    owner = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    name = models.CharField()
    score = models.IntegerField()

class Job_Profiles(models.Model):
    owner = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    profile = models.CharField()
    company = models.CharField(null=True)
    location = models.CharField(null=True)
    start_time = models.DateField(null=True)
    end_time = models.DateField(null=True)
    is_current = models.BooleanField(default=False)

class Profile_Summaries(models.Model):
    owner = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    name = models.CharField()
    summary = models.TextField()

class Educations(models.Model):
    owner = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    degree = models.CharField()
    provider = models.CharField(null=True)
    start_time = models.DateField(null=True)
    end_time = models.DateField(null=True)
    is_current = models.BooleanField(default=False)

class Projects(models.Model):
    owner = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    title = models.TextField()
    story = models.TextField()
    keywords = models.CharField()

class Projects_Summaries(models.Model):
    owner = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    project = models.ForeignKey(Projects,on_delete=models.CASCADE)
    summary = models.TextField(null=False)

    

