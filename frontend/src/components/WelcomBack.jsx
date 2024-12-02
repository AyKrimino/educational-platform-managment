import React, { useState, useContext } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import studentImage from "../assets/images/student.png";
import teacherImage from "../assets/images/teacher.png";
import AuthContext from "../context/AuthContext";
import CreateClassroomModal from "./createClassroomModal";
import JoinClassroomModal from "./JoinClassroomModal";

const WelcomeBack = () => {
  const { auth } = useContext(AuthContext);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);

  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);

  const handleJoinModalOpen = () => setJoinModalOpen(true);
  const handleJoinModalClose = () => setJoinModalOpen(false);

  return (
    <Container>
      <Grid container mt={3} justifyContent="center" spacing={3}>
        <Grid item sm={8}>
          <Card
            elevation={0}
            sx={{
              backgroundColor: "inherit",
              py: 0,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <CardContent sx={{ p: "30px" }}>
              <Grid container spacing={3} justifyContent="space-between">
                <Grid item sm={6} display="flex" alignItems="center">
                  <Box
                    sx={{
                      textAlign: {
                        xs: "center",
                        sm: "left",
                      },
                    }}
                  >
                    <Typography variant="h5">Welcome back Natalia!</Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      my={2}
                    >
                      It's great to have you back! We've missed you and are
                      thrilled to see you again.
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="textSecondary"
                      my={2}
                    >
                      Get started by{" "}
                      {auth.role === "teacher" ? "creating" : "joining"} a new
                      classroom.
                    </Typography>
                    <Button variant="contained" color="primary" onClick={auth.role === "teacher" ? handleCreateModalOpen : handleJoinModalOpen}>
                      {auth.role === "teacher" ? "Create" : "Join"} New
                      Classroom
                    </Button>
                  </Box>
                </Grid>
                <Grid item sm={5}>
                  <Box mb="-30px">
                    <img
                      src={
                        auth.role === "teacher" ? teacherImage : studentImage
                      }
                      alt={`${
                        auth.role === "teacher" ? "Teacher" : "Student"
                      } illustration.`}
                      width={280}
                      height={200}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <CreateClassroomModal open={createModalOpen} handleClose={handleCreateModalClose} />
      <JoinClassroomModal open={joinModalOpen} handleClose={handleJoinModalClose} />
    </Container>
  );
};

export default WelcomeBack;
