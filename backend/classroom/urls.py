from django.urls import path

from .views import (ClassroomListAPIView, ClassroomCreateAPIView, ClassroomRetrieveUpdateDestroyAPIView,
                    StudentClassroomListAPIView,
                    StudentClassroomCreateAPIView, StudentClassroomRetrieveDestroyAPIView, 
                    StudentLeaveClassroomAPIView)

app_name = "classroom"

urlpatterns = [
    path("classrooms/", ClassroomListAPIView.as_view(), name="classrooms-list"),
    path("classrooms/create/", ClassroomCreateAPIView.as_view(), name="classrooms-create"),
    path("classrooms/<uuid:pk>/", ClassroomRetrieveUpdateDestroyAPIView.as_view(), name="classrooms-detail"),
    path("students-classrooms/", StudentClassroomListAPIView.as_view(), name="students-classrooms-list"),
    path("students-classrooms/create/", StudentClassroomCreateAPIView.as_view(), name="students-classrooms-create"),
    path("students-classrooms/<uuid:student_id>/<uuid:classroom_id>/", StudentClassroomRetrieveDestroyAPIView.as_view(),
         name="students-classrooms-detail"),
    path("students-classrooms/delete/<int:student_user_id>/<uuid:classroom_id>/", StudentLeaveClassroomAPIView.as_view(),
         name="student-leave-classroom"),
]
