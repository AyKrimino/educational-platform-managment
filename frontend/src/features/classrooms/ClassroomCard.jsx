import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const ClassroomCard = ({ classroomName, teacherName, studentsCount }) => {
  const { auth } = useContext(AuthContext);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {classroomName}
          </Typography>
          <Typography>Instructor: {teacherName}</Typography>
          {auth.role === "teacher" && 
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Students number: {studentsCount}
            </Typography>
          }
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="error">
          {auth.role === "teacher" ? "delete" : "Leave"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClassroomCard;
