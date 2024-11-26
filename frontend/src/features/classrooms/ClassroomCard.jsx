import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

const ClassroomCard = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Operating Systems Course
          </Typography>
          <Typography>Instructor: Imed Ben Youness</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Students number: 15
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="warning">
          Leave
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClassroomCard;
