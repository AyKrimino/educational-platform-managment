import { useContext, useEffect, useState } from "react";
import ClassroomCard from "./ClassroomCard";
import { Typography } from "@mui/material";
import { getClassroomList } from "../../services/Classrooms";
import ClassroomContext from "../../context/ClassroomContext";
import {
  getClassroomListWithStudentCounts,
  getStudentsClassroomsList,
} from "../../services/studentsClassrooms";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ListClassroomCards = ({ limit }) => {
  const [classrooms, setClassrooms] = useState([]);
  const { createModalOpen, joinModalOpen } = useContext(ClassroomContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    auth.role === "teacher"
      ? fetchTeacherClassrooms()
      : fetchStudentsClassroomList();
  }, [createModalOpen, joinModalOpen]);

  const fetchTeacherClassrooms = async () => {
    try {
      const [allClassroomsResponse, classroomsWithStudentsResponse] =
        await Promise.all([
          getClassroomList(),
          getClassroomListWithStudentCounts(),
        ]);

      const combinedClassrooms = allClassroomsResponse.data.map(
        (classroom) => ({
          ...classroom,
          studentsCount:
            classroomsWithStudentsResponse[classroom.id]?.studentsCount || 0,
        })
      );
      setClassrooms(combinedClassrooms);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStudentsClassroomList = async () => {
    try {
      const response = await getStudentsClassroomsList();
      setClassrooms(response.data.map((obj) => obj.classroom));
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeaveClassroom = (classroomId) => {
    setClassrooms(
      (prevClassrooms) => prevClassrooms.filter(
        (classroom) => classroom.id !== classroomId
      )
    );
  }

  const handleCardClick = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };

  const displayedClassrooms = limit
    ? classrooms.slice(0, limit)
    : classrooms;

  return (
    <div className="flex flex-col items-center py-8 px-4">
      {displayedClassrooms.length > 0 ? (
        <>
          <div className="mb-8">
            <Typography variant="h5">Your Classrooms</Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedClassrooms.map((classroom) => (
              <ClassroomCard
                key={classroom.id}
                classroomId={classroom.id}
                classroomName={classroom.name}
                teacherName={`${classroom.teacher.user_first_name} ${classroom.teacher.user_last_name}`}
                studentsCount={classroom.studentsCount}
                onLeave={handleLeaveClassroom}
                onClick={() => handleCardClick(classroom.id)}
              />
            ))}
          </div>
        </>
      ) : (
          <div className="mb-8">
            <Typography variant="h5" align="center">
              {auth.role === "teacher"
                ? "You haven't created any classrooms yet."
                : "You haven't joined any classrooms yet."}
            </Typography>
          </div>
        )}
    </div>
  );
};

export default ListClassroomCards;
