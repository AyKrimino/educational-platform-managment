import { useContext, useEffect, useState } from "react";
import ClassroomCard from "./ClassroomCard";
import { Typography } from "@mui/material";
import { getClassroomList } from "../../services/Classrooms";
import ClassroomContext from "../../context/ClassroomContext";
import { getStudentsClassroomsList } from "../../services/studentsClassrooms";
import AuthContext from "../../context/AuthContext";

const ListClassroomCards = () => {
  const [classrooms, setClassrooms] = useState([]);
  const { createModalOpen, joinModalOpen } = useContext(ClassroomContext);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    auth.role === "teacher"
      ? fetchClassroomList()
      : fetchStudentsClassroomList();
  }, [createModalOpen, joinModalOpen]);

  const fetchClassroomList = async () => {
    try {
      const response = await getClassroomList();
      setClassrooms(response.data);
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

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <div className="mb-8">
        <Typography variant="h5">Your Classrooms</Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {classrooms.map((classroom, index) => (
          <ClassroomCard
            key={index}
            classroomName={classroom.name}
            teacherName={`${classroom.teacher.user_first_name} ${classroom.teacher.user_last_name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ListClassroomCards;
