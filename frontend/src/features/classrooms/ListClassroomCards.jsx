import { useContext, useEffect, useState } from "react";
import ClassroomCard from "./ClassroomCard";
import { Typography } from "@mui/material";
import { getClassroomList } from "../../services/Classrooms";
import ClassroomContext from "../../context/ClassroomContext";

const ListClassroomCards = () => {
  const [classrooms, setClassrooms] = useState([]);
  const { createModalOpen } = useContext(ClassroomContext);
  useEffect(() => {
    const fetchClassroomList = async () => {
      try {
        const response = await getClassroomList();
        setClassrooms(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClassroomList();
  }, [createModalOpen]);

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
