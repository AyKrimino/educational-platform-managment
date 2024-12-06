import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { removeStudentFromClassroom } from "../../services/studentsClassrooms";
import { deleteClassroom } from "../../services/Classrooms";

const ClassroomCard = ({ classroomId, classroomName, teacherName, studentsCount, onLeave }) => {
  const { auth } = useContext(AuthContext);

  const handleLeaveClassroom = async () => {
    try {
      const base64Url = auth.access.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(atob(base64));
      const userId = payload.user_id;

      await removeStudentFromClassroom(userId, classroomId);
      onLeave(classroomId);
    } catch (error) {
      console.error("Error leaving classroom: ", error);
    }
  };

  const handleDeleteClassroom = async () => {
    try {
      await deleteClassroom(classroomId);
      onLeave(classroomId);
    } catch (error) {
      console.error("Error deleting classroom:", error);
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {classroomName}
          </Typography>
          <Typography>Instructor: {teacherName}</Typography>
          {auth.role === "teacher" && (
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Students number: {studentsCount}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button 
          size="small"
          color="error"
          onClick={auth.role === "student" ? handleLeaveClassroom : handleDeleteClassroom}
        >
          {auth.role === "teacher" ? "Delete" : "Leave"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClassroomCard;

