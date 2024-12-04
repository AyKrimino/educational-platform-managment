import React, { useContext, useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { createClassroom } from "../services/Classrooms";
import ClassroomContext from "../context/ClassroomContext";

const CreateClassroomModal = () => {
  const [classroomName, setClassroomName] = useState("");
  const { createModalOpen, handleCreateModalClose } =
    useContext(ClassroomContext);

  const handleCreate = async () => {
    try {
      const response = await createClassroom(classroomName);
      if (response.status === 201) {
        handleCreateModalClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open={createModalOpen} onClose={handleCreateModalClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" mb={2}>
          Create New Classroom
        </Typography>
        <TextField
          label="Classroom Name"
          fullWidth
          value={classroomName}
          onChange={(e) => setClassroomName(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreate}
          sx={{ mt: 2 }}
        >
          Create
        </Button>
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

export default CreateClassroomModal;
