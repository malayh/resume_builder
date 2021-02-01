from django.urls import path
from .views import *

urlpatterns = [
    path('coreapi/contacts/',ContactList.as_view()),
    path('coreapi/contacts/<int:pk>/',ContactDetail.as_view()),

    path('coreapi/skills/',SkillList.as_view()),
    path('coreapi/skills/<int:pk>/',SkillDetail.as_view()),

    path('coreapi/jobprofiles/',JobProfileList.as_view()),
    path('coreapi/jobprofiles/<int:pk>/',JobProfileDetail.as_view()),

    path('coreapi/summaries/',ProfileSummaryList.as_view()),
    path('coreapi/summaries/<int:pk>/',ProfileSummaryDetail.as_view()),

    path('coreapi/edus/',EducationList.as_view()),
    path('coreapi/edus/<int:pk>/',EducationDetail.as_view()),

    path('coreapi/projects/',ProjectList.as_view()),
    path('coreapi/projects/<int:pk>/',ProjectDetail.as_view()),

    path('coreapi/projects/summaries/',ProjectSummaryList.as_view()),
    path('coreapi/projects/summaries/<int:pk>/',ProjectSummaryDetail.as_view()),

    path('coreapi/resumes/',ResumeList.as_view()),
    path('coreapi/resumes/<int:pk>/',ResumeDetail.as_view()),

    path('coreapi/resumes/<int:resume_id>/contacts/',Resume_CD_List.as_view()),
    path('coreapi/resumes/<int:resume_id>/contacts/<int:cd_id>/',Resume_CD_Detail.as_view()),

    path('coreapi/resumes/<int:resume_id>/skills/',Resume_Skill_List.as_view()),
    path('coreapi/resumes/<int:resume_id>/skills/<int:s_id>/',Resume_Skill_Detail.as_view()),
    
    path('coreapi/resumes/<int:resume_id>/ps/',Resume_PS_List.as_view()),
    path('coreapi/resumes/<int:resume_id>/ps/<int:ps_id>/',Resume_PS_Detail.as_view()),

    path('coreapi/resumes/<int:resume_id>/wh/',Resume_WH_List.as_view()),
    path('coreapi/resumes/<int:resume_id>/wh/<int:jp_id>/',Resume_WH_Detail.as_view()),

    path('coreapi/resumes/<int:resume_id>/edu/',Resume_Edu_List.as_view()),
    path('coreapi/resumes/<int:resume_id>/edu/<int:edu_id>/',Resume_Edu_Detail.as_view()),

    path('coreapi/resumes/<int:resume_id>/sections/',Resume_Sections_List.as_view()),
    path('coreapi/resumes/<int:resume_id>/sections/<int:section_id>/',Resume_Section_Detail.as_view()),



    # path('coreapi/resumes/<int:pk>/whs/',<TODO>.as_view()),
    # path('coreapi/resumes/<int:pk>/whs/summaries/',<TODO>.as_view()),

]