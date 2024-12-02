import axiosInstance from './axiosInstance';

export const createClassroom = async (name) => {
    try {
        const response = await axiosInstance.post('/classrooms/create/', { name });
        return response;
    } catch (error) {
        throw error;
    }
};

export const getClassroomById = async (id) => {
    try {
        const response = await axiosInstance.get(`/classrooms/${id}/`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const joinClassroom = async (classroomId) => {
    try {
        const response = await axiosInstance.post('/students-classrooms/create/', { classroom_id: classroomId });
        return response;
    } catch (error) {
        throw error;
    }
};