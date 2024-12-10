from django.urls import path

from .views import (TeacherProfileListAPIView,
                    TeacherProfileRetrieveUpdateDestroyAPIView,
                    TeacherProfileByUserAPIView,
                    StudentProfileListAPIView,
                    StudentProfileRetrieveUpdateDestroyAPIView,
                    StudentProfileByUserAPIView,
                    TeacherProfileByUserIdAPIView,
                    StudentProfileByUserIdAPIView)

app_name = "account"

urlpatterns = [
    path("profiles/teachers/", TeacherProfileListAPIView.as_view(), name="teachers-list"),
    path("profiles/teachers/<uuid:pk>/", TeacherProfileRetrieveUpdateDestroyAPIView.as_view(), name="teachers-detail"),
    path("profiles/teachers/me/", TeacherProfileByUserAPIView.as_view(), name="teacher-profile-by-user"),
    path("profiles/students/", StudentProfileListAPIView.as_view(), name="students-list"),
    path("profiles/students/<uuid:pk>/", StudentProfileRetrieveUpdateDestroyAPIView.as_view(), name="students-detail"),
    path("profiles/students/me/", StudentProfileByUserAPIView.as_view(), name="student-profile-by-user"),
    path("profiles/teachers/<int:user_id>/", TeacherProfileByUserIdAPIView.as_view(), name="teacher-profile-by-user-id"),
    path("profiles/students/<int:user_id>/", StudentProfileByUserIdAPIView.as_view(), name="student-profile-by-user-id"),
]
