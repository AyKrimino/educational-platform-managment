import axiosInstance from "./axiosInstance";

export const getStudentsClassroomsList = async () => {
  try {
    const response = await axiosInstance.get("/students-classrooms/");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getClassroomListWithStudentCounts = async () => {
  try {
    const response = await axiosInstance.get("/students-classrooms/");
    return response.data.reduce((acc, record) => {
      const classroomId = record.classroom.id;
      if (!acc[classroomId]) {
        acc[classroomId] = {
          ...record.classroom,
          studentsCount: 0,
        };
      }
      acc[classroomId].studentsCount++;
      return acc;
    }, {});
  } catch (error) {
    throw error;
  }
};
