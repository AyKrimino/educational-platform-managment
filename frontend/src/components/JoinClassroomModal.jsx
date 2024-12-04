import React, { useContext, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { joinClassroom } from "../services/Classrooms";
import ClassroomContext from "../context/ClassroomContext";

const JoinClassroomModal = () => {
  const [classroomId, setClassroomId] = useState("");
  const { joinModalOpen, handleJoinModalClose } = useContext(ClassroomContext);

  const handleJoinClassroom = async () => {
    try {
      const response = await joinClassroom(classroomId);
      if (response.status === 201) {
        handleJoinModalClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={joinModalOpen} onClose={handleJoinModalClose}>
      <Box sx={{ ...modalStyle }}>
        <>
          <Typography variant="h6" mb={2}>
            Join Classroom
          </Typography>
          <TextField
            label="Classroom UUID"
            fullWidth
            value={classroomId}
            onChange={(e) => setClassroomId(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoinClassroom}
            sx={{ mt: 2 }}
          >
            join Classroom
          </Button>
        </>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default JoinClassroomModal;
