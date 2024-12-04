import axiosInstance from "./axiosInstance";

export const getStudentsClassroomsList = async () => {
  try {
    const response = await axiosInstance.get("/students-classrooms/");
    return response;
  } catch (error) {
    throw error;
  }
};
