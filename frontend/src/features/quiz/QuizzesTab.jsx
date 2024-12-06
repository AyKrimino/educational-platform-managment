import { useContext, useState } from "react";
import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import AuthContext from "../../context/AuthContext";

const QuizzesTab = ({ classroomId }) => {
  const { auth } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const [newQuizTitle, setNewQuizTitle] = useState("");

  const handleCreateQuiz = () => {
    setQuizzes((prev) => [...prev, { title: newQuizTitle }]);
    setNewQuizTitle("");
    console.log("implement createQuiz()");
  };

  return (
    <Box
      sx={{
        px: 3,
        py: 4,
        maxWidth: "800px", // Limit max width for large screens
        margin: "0 auto", // Center content
      }}
    >
      {/* Section for creating a new quiz */}
      {auth.role === "teacher" && (
        <Box
          mb={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="New Quiz Title"
            value={newQuizTitle}
            onChange={(e) => setNewQuizTitle(e.target.value)}
            fullWidth
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateQuiz}
            sx={{
              textTransform: "none", // Removes uppercase text
              fontWeight: "bold",
              boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
              ":hover": {
                backgroundColor: "#1976d2",
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              },
            }}
          >
            Create Quiz
          </Button>
        </Box>
      )}

      {/* Display created quizzes */}
      <Box>
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <Box key={index} sx={{ mb: 3, p: 2, boxShadow: "0 3px 8px rgba(0,0,0,0.2)", borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                {quiz.title}
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No quizzes created yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default QuizzesTab;

