import { useState, useContext } from "react";
import { Tabs, Tab, Box, Typography, Button } from "@mui/material";
import PostsTab from "../features/posts/PostsTab";
import QuizzesTab from "../features/quiz/QuizzesTab";
import AuthContext from "../context/AuthContext";
import Breadcrumb from "../components/BreadcrumbNav";

const ClassroomPage = ({ classroomId }) => {
  const { auth } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="h-[100%] w-[100%] bg-gray-100 overflow-y-auto">
      <Breadcrumb currentPage="Classroom" />
      <Box sx={{ padding: "16px", display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" mb={2}>
          Classroom Details
        </Typography>
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
