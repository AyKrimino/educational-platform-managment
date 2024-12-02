import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { createClassroom } from '../services/Classrooms';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateClassroomModal = ({ open, handleClose }) => {
    const [classroomName, setClassroomName] = useState('');

    const handleCreate = async () => {
        try {
            console.log("Creating classroom with name: ", classroomName);
            const response = await createClassroom(classroomName);
            if (response.status === 201) {
                toast.success('Classroom created successfully!');
                handleClose();
            }
        } catch (error) {
            toast.error('Failed to create classroom. Please try again.');
            console.error(error);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" mb={2}>Create New Classroom</Typography>
                <TextField
                    label="Classroom Name"
                    fullWidth
                    value={classroomName}
                    onChange={(e) => setClassroomName(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleCreate} sx={{ mt: 2 }}>
                    Create
                </Button>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default CreateClassroomModal;