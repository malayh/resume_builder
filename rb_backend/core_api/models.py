from django.db import models
from users.models import RB_User

# Create your models here.
class Contact_Details(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    label = models.TextField()
    value = models.TextField()

    def __str__(self):
        return f"{self.label} : {self.value}"

class Skills(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    name = models.TextField()
    score = models.IntegerField()
    def __str__(self):
        return f"{self.name} : {self.score}"

class Job_Profiles(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    profile = models.TextField()
    company = models.TextField(null=True)
    location = models.TextField(null=True)
    start_time = models.DateField(null=True)
    end_time = models.DateField(null=True)
    is_current = models.BooleanField(default=False)

class Profile_Summaries(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    name = models.TextField()
    summary = models.TextField()

class Educations(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    degree = models.TextField()
    provider = models.TextField(null=True)
    start_time = models.DateField(null=True)
    end_time = models.DateField(null=True)
    is_current = models.BooleanField(default=False)

class Projects(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    title = models.TextField()
    story = models.TextField()
    keywords = models.TextField()

class Projects_Summaries(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    project_fk = models.ForeignKey(Projects,on_delete=models.CASCADE)
    summary = models.TextField(null=False)



class Resumes(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    profile = models.TextField(null=False)
    profile_summary_fk = models.ForeignKey(Profile_Summaries,on_delete=models.SET_NULL,null=True)

class Resume_Contact_Detail_Map(models.Model):
    resume_fk = models.ForeignKey(Resumes,on_delete=models.CASCADE)
    contact_details_fk = models.ForeignKey(Contact_Details,on_delete=models.CASCADE)

class Resume_Skill_Map(models.Model):
    resume_fk = models.ForeignKey(Resumes,on_delete=models.CASCADE)
    skill_fk = models.ForeignKey(Skills,on_delete=models.CASCADE)

class Resume_Project_Summary_Map(models.Model):
    resume_fk = models.ForeignKey(Resumes,on_delete=models.CASCADE)
    project_summary_fk = models.ForeignKey(Profile_Summaries,on_delete=models.CASCADE)

class Resume_Work_History_Map(models.Model):
    resume_fk = models.ForeignKey(Resumes,on_delete=models.CASCADE)
    job_profile_fk = models.ForeignKey(Job_Profiles,on_delete=models.CASCADE)

class Resume_Work_History_Project_Summary_Map(models.Model):
    resume_fk = models.ForeignKey(Resumes,on_delete=models.CASCADE)
    resume_wh_fk = models.ForeignKey(Resume_Work_History_Map,on_delete=models.CASCADE)
    project_summary_fk = models.ForeignKey(Profile_Summaries,on_delete=models.CASCADE)

class Resume_Education_Map(models.Model):
    resume_fk = models.ForeignKey(Resumes,on_delete=models.CASCADE)
    education_fk = models.ForeignKey(Educations,on_delete=models.CASCADE)

class Resume_Education_Project_Summary_Map(models.Model):
    resume_fk = models.ForeignKey(Resumes,on_delete=models.CASCADE)
    resume_edu_fk = models.ForeignKey(Resume_Education_Map,on_delete=models.CASCADE)
    project_summary_fk = models.ForeignKey(Profile_Summaries,on_delete=models.CASCADE)

class Resume_Content_Section_Positions(models.Model):
    resume_fk = models.ForeignKey(Resumes,on_delete=models.CASCADE)
    section_name = models.TextField()
    position = models.IntegerField()




       









    

