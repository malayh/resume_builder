from django.db import models
from users.models import RB_User

# NOTE:
#   - Every entity must have user_fk
#   - Two entities can be mapped to each other only by creator of both entities
#   - Which ever entities have a fk field, must declare list named "fks" in Meta class of the respective
#   seriallizer


# ------ Entity models ------
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



# -------- Resume Composition models -----------
class Resumes(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    title = models.TextField()
    job_profile_fk = models.ForeignKey(Job_Profiles,on_delete=models.SET_NULL,null=True)
    profile_summary_fk = models.ForeignKey(Profile_Summaries,on_delete=models.SET_NULL,null=True)

class Resume_Subsections(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    resume_fk = models.ForeignKey(Resumes,on_delete=models.CASCADE)
    title = models.TextField(null=True)
    position = models.IntegerField()
    class Meta:
        unique_together = ('resume_fk', 'position',)


class Abstract_Entity_Resume_Map(models.Model):
    user_fk = models.ForeignKey(RB_User,on_delete=models.CASCADE)
    resume_fk = models.ForeignKey(Resumes,on_delete=models.CASCADE)
    resume_subsection_fk = models.ForeignKey(Resume_Subsections,on_delete=models.CASCADE)
    position = models.IntegerField()
    class Meta:
        abstract = True
        unique_together = ('resume_subsection_fk', 'position',)

class Contact_Resume_Map(Abstract_Entity_Resume_Map):
    contact_fk = models.ForeignKey(Contact_Details,on_delete=models.CASCADE)

class Skill_Resume_Map(Abstract_Entity_Resume_Map):
    skill_fk = models.ForeignKey(Skills,on_delete=models.CASCADE)

class Education_Resume_Map(Abstract_Entity_Resume_Map):
    education_fk = models.ForeignKey(Educations,on_delete=models.CASCADE)

class Project_Resume_Map(Abstract_Entity_Resume_Map):
    project_fk = models.ForeignKey(Projects,on_delete=models.CASCADE)

class Project_Summary_Resume_Map(Abstract_Entity_Resume_Map):
    project_summary_fk = models.ForeignKey(Projects_Summaries,on_delete=models.CASCADE)

       









    

