import { useContext, useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import PostsTab from "../features/posts/PostsTab";
import QuizzesTab from "../features/quiz/QuizzesTab";
import AuthContext from "../context/AuthContext";
import Breadcrumb from "../components/BreadcrumbNav";
import { useParams } from "react-router-dom";
import { getClassroomById } from "../services/Classrooms";

const ClassroomPage = () => {
  const { auth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);
  const [classroomName, setClassroomName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const { classroomId } = useParams();

  useEffect(() => {
    const fetchClassroomName = async () => {
      try {
        const response = await getClassroomById(classroomId);
        setClassroomName(response.data.name);
        setTeacherName(
          `${response.data.teacher.user_first_name} ${response.data.teacher.user_last_name}`,
        );
      } catch (error) {
        console.error("Error fetching classroom name:", error);
      }
    };
    fetchClassroomName();
  }, [classroomId]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="h-[100%] w-[100%] bg-gray-100 overflow-y-auto">
      <Breadcrumb currentPage="Classroom" />
      <Box sx={{ padding: "16px", display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Classroom: {classroomName}
        </Typography>
        {auth.role === "student" && (
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", fontStyle: "italic" }}
          >
            Instructor: {teacherName}
          </Typography>
        )}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Posts" />
          <Tab label="Quizzes" />
        </Tabs>
        <Box mt={2}>
          {activeTab === 0 && <PostsTab classroomId={classroomId} />}
          {activeTab === 1 && <QuizzesTab classroomId={classroomId} />}
        </Box>
      </Box>
    </div>
  );
};

export default ClassroomPage;
