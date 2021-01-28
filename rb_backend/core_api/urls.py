from django.urls import path
from .views import ContactList, ContactDetail, \
                    SkillList, SkillDetail

urlpatterns = [
    path('coreapi/contacts/',ContactList.as_view()),
    path('coreapi/contacts/<int:pk>/',ContactDetail.as_view()),
    path('coreapi/skills/',SkillList.as_view()),
    path('coreapi/skills/<int:pk>/',SkillDetail.as_view()),

]