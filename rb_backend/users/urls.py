from django.urls import path
from .views import Signup, Auth , Logout, Test, UserInfo
urlpatterns = [
    path('users/',UserInfo.as_view()),
    path('users/signup/',Signup.as_view()),
    path('users/login/',Auth.as_view()),
    path('users/logout/',Logout.as_view()),
    path('users/test/',Test.as_view())
]