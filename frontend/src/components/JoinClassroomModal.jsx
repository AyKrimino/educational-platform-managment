import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { joinClassroom } from "../services/Classrooms";

const JoinClassroomModal = ({ open, handleClose }) => {
  const [classroomId, setClassroomId] = useState("");

  const handleJoinClassroom = async () => {
    try {
      const response = await joinClassroom(classroomId);
      if (response.status === 201) {
        console.log("success joined", response.data);
        handleClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
