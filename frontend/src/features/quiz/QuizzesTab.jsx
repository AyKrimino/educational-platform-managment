import { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Modal,
  IconButton,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AuthContext from "../../context/AuthContext";
import {
  createQuiz,
  getQuizzesByClassroomId,
  createQuestion,
  getQuestions,
  createAnswer,
  getAnswers,
} from "../../services/quizzesService.js";

const QuizzesTab = ({ classroomId }) => {
  const { auth } = useContext(AuthContext);
  const [quizzes, setQuizzes] = useState([]);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizContent, setNewQuizContent] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [newAnswerIsValid, setNewAnswerIsValid] = useState(false);

  useEffect(() => {
    const getQuizzesListWithQuestionsAndAnswers = async () => {
      try {
        const quizzesResponse = await getQuizzesByClassroomId(classroomId);
        const quizzesWithoutQuestions = quizzesResponse.data;

        const quizzesWithQuestionsAndAnswers = await Promise.all(
          quizzesWithoutQuestions.map(async (quiz) => {
            try {
              const questionsResponse = await getQuestions(quiz.id);
              const questionsWithoutAnswers = questionsResponse.data;

              const questionsWithAnswers = await Promise.all(
                questionsWithoutAnswers.map(async (question) => {
                  try {
                    const answersResponse = await getAnswers(
                      quiz.id,
                      question.id
                    );
                    return { ...question, answers: answersResponse.data };
                  } catch (error) {
                    console.error(
                      `Error fetching answers for question ${question.id} in quiz ${quiz.id}:`,
                      error
                    );
                    return { ...question, answers: [] };
                  }
                })
              );

              return { ...quiz, questions: questionsWithAnswers };
            } catch (error) {
              console.error(
                `Error fetching questions for quiz ${quiz.id}:`,
                error
              );
              return { ...quiz, questions: [] };
            }
          })
        );

        setQuizzes(quizzesWithQuestionsAndAnswers);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    getQuizzesListWithQuestionsAndAnswers();
  }, [classroomId]);

  const handleCreateQuiz = async () => {
    if (!newQuizTitle.trim()) return;
    try {
      const response = await createQuiz({
        title: newQuizTitle,
        content: newQuizContent,
        classroom_id: classroomId,
      });
      setQuizzes((prev) => [response.data, ...prev]);
      setNewQuizTitle("");
      setNewQuizContent("");
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;
    try {
      const response = await createQuestion(selectedQuizId, {
        description: newQuestion,
      });
      setQuizzes(
        quizzes.map((quiz) => {
          if (quiz.id === selectedQuizId) {
            if (quiz?.questions) {
              return {
                ...quiz,
                questions: [...quiz.questions, response.data],
              };
            } else {
              return { ...quiz, questions: [response.data] };
            }
          } else {
            return quiz;
          }
        })
      );
      setNewQuestion("");
      setIsQuestionModalOpen(false);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleAddAnswer = async () => {
    if (!newAnswer.trim()) return;
    try {
      const response = await createAnswer(selectedQuizId, currentQuestionId, {
        description: newAnswer,
        is_valid: newAnswerIsValid,
      });
      setQuizzes((prev) =>
        prev.map((quiz) =>
          quiz.id === selectedQuizId
            ? {
                ...quiz,
                questions: quiz.questions.map((q) =>
                  q.id === currentQuestionId
                    ? { ...q, answers: [...(q.answers || []), response.data] }
                    : q
                ),
              }
            : quiz
        )
      );
      setNewAnswer("");
      setIsAnswerModalOpen(false);
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  const handleValidToggle = (quizId, questionId, answerId) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.id === quizId
          ? {
              ...quiz,
              questions: quiz.questions.map((question) =>
                question.id === questionId
                  ? {
                      ...question,
                      answers: question.answers.map((answer) =>
                        answer.id === answerId
                          ? { ...answer, is_valid: !answer.is_valid }
                          : answer
                      ),
                    }
                  : question
              ),
            }
          : quiz
      )
    );
  };

  return (
    <Box
      sx={{
        px: 3,
        py: 4,
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
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
          <TextField
            label="Quiz Content"
            value={newQuizContent}
            multiline
            fullWidth
            rows={4}
            onChange={(e) => setNewQuizContent(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateQuiz}
            sx={{
              textTransform: "none",
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

      <Box>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <Box
              key={quiz.id}
              sx={{
                mb: 3,
                p: 2,
                boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h4"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                  gutterBottom
                >
                  {quiz.title}
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                  gutterBottom
                >
                  {quiz.content}
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setSelectedQuizId(quiz.id);
                  setIsQuestionModalOpen(true);
                }}
              >
                Add Question
              </Button>
              <Divider sx={{ my: 1 }} />
              {quiz.questions?.map((question) => (
                <Box key={question.id} sx={{ my: 2 }}>
                  <Typography
                    style={{
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                    }}
                    variant="body1"
                    gutterBottom
                  >
                    {question.description}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      setCurrentQuestionId(question.id);
                      setSelectedQuizId(quiz.id);
                      setIsAnswerModalOpen(true);
                    }}
                  >
                    Add Answer
                  </Button>
                  {question.answers?.map((answer) => (
                    <Box
                      key={answer.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        ml: 2,
                        my: 1,
                        gap: 1,
                      }}
                    >
                      <Radio
                        checked={answer.is_valid}
                        onChange={() =>
                          handleValidToggle(quiz.id, question.id, answer.id)
                        }
                        color="primary"
                      />
                      <Typography
                        style={{
                          wordWrap:"break-word",
                          overflowX: "hidden",
                          textOverflow: "initial",
                        }}
                        variant="body2"
                      >
                        {answer.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ))}
            </Box>
          ))
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No quizzes created yet.
          </Typography>
        )}
      </Box>

      {/* Modal for Adding Questions */}
      <Modal
        open={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: "400px",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => setIsQuestionModalOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Add Question
          </Typography>
          <TextField
            label="Question Content"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ my: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddQuestion}
            fullWidth
          >
            Add Question
          </Button>
        </Box>
      </Modal>

      {/* Modal for Adding Answers */}
      <Modal
        open={isAnswerModalOpen}
        onClose={() => setIsAnswerModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: "400px",
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={() => setIsAnswerModalOpen(false)}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Add Answer
          </Typography>
          <TextField
            label="Answer Content"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ my: 2 }}
          />
          <FormControl sx={{ mt: 2 }}>
            <FormLabel>Is Valid</FormLabel>
            <RadioGroup
              row
              value={newAnswerIsValid.toString()}
              onChange={(e) => setNewAnswerIsValid(e.target.value === "true")}
            >
              <FormControlLabel value="true" control={<Radio />} label="True" />
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddAnswer}
            fullWidth
          >
            Add Answer
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default QuizzesTab;
