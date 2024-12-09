import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import WelcomeBack from "../components/WelcomBack";
import ListClassroomCards from "../features/classrooms/ListClassroomCards";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getClassroomList } from "../services/Classrooms";
import { getStudentsClassroomsList } from "../services/studentsClassrooms";
import ClassroomContext from "../context/ClassroomContext";

const Home = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hasClassrooms, setHasClassrooms] = useState(false);
  const { createModalOpen, joinModalOpen } = useContext(ClassroomContext);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = 
          auth.role === "teacher" 
            ? await getClassroomList() 
            : await getStudentsClassroomsList();

        setHasClassrooms(
          auth.role === "teacher" ? response.data.length > 0 : response.data.some(obj => obj.classroom)
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchClassrooms();
  }, [auth.role, createModalOpen, joinModalOpen]);

  if (!auth) return <p>Loading...</p>;

  return (
    <div className="h-[100%] w-[100%] overflow-y-auto overflow-x-hidden bg-gray-100">
      <WelcomeBack />
      <ListClassroomCards limit={8} />
      {hasClassrooms && (
        <div className="flex justify-center mt-2 mb-4">
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/classrooms")}
          >
            See All Classrooms
          </Button>
        </div>
      )}
    </div>
  );
};

export default Home;

