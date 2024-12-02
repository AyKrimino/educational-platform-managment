import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { getClassroomById, joinClassroom } from '../services/Classrooms';

const JoinClassroomModal = ({ open, handleClose }) => {
    const [classroomId, setClassroomId] = useState('');
    const [classroomName, setClassroomName] = useState('');
    const [step, setStep] = useState(1);

    const handleGetClassroom = async () => {
        try {
            const response = await getClassroomById(classroomId);
            if (response.status === 200) {
                console.log("success", response.data);
                setClassroomName(response.data.name);
                setStep(2);
            }
        } catch (error) {
            console.error(error);
        }
    };

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
                {step === 1 ? (
                    <>
                        <Typography variant="h6" mb={2}>Join Classroom</Typography>
                        <TextField
                            label="Classroom UUID"
                            fullWidth
                            value={classroomId}
                            onChange={(e) => setClassroomId(e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleGetClassroom} sx={{ mt: 2 }}>
                            Get Classroom
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" mb={2}>Join Classroom</Typography>
                        <Typography variant="subtitle1" mb={2}>You are about to join classroom: {classroomName}</Typography>
                        <Button variant="contained" color="primary" onClick={handleJoinClassroom} sx={{ mt: 2 }}>
                            Join
                        </Button>
                    </>
                )}
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

export default JoinClassroomModal;