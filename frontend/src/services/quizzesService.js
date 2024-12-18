import axiosInstance from "./axiosInstance";

export const createQuiz = async (quizData) => {
  try {
    const response = await axiosInstance.post("/quizzes/create/", quizData);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const updateQuiz = async (quizId, quizData) => {
  try {
    const response = await axiosInstace.put(`/quizzes/${quizId}/`, quizData);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const deleteQuiz = async (quizId) => {
  try {
    const response = await axiosInstance.delete(`/quizzes/${quizId}/`);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const getQuiz = async (quizId) => {
  try {
    const response = await axiosInstance.get(`/quizzes/${quizId}/`);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const createQuestion = async (quizId, questionData) => {
  try {
    const response = await axiosInstance.post(`/quizzes/${quizId}/questions/create/`, questionData);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const updateQuestion = async (quizId, questionId, questionData) => {
  try {
    const response = await axiosInstance.put(`/quizzes/${quizId}/questions/${questionId}/`, questionData);
    return response
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const deleteQuestion = async (quizId, questionId) => {
  try {
    const response = await axiosInstance.delete(`/quizzes/${quizId}/questions/${questionId}/`);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const getQuestion = async (quizId, questionId) => {
  try {
    const response = await axiosInstance.get(`/quizzes/${quizId}/questions/${questionId}/`);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const getQuestions = async (quizId) => {
  try {
    const response = await axiosInstance.get(`/quizzes/${quizId}/questions/`);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const createAnswer = async (quizId, questionId, answerData) => {
  try {
    const response = await axiosInstance.post(`/quizzes/${quizId}/questions/${questionId}/answers/create/`, answerData);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const updateAnswer = async (quizId, questionId, answerId, answerData) => {
  try {
    const response = await axiosInstance.put(`/quizzes/${quizId}/questions/${questionId}/answers/${answerId}/`, answerData);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const deleteAnswer = async (quizId, questionId, answerId) => {
  try {
    const response = await axiosInstance.delete(`/quizzes/${quizId}/questions/${questionId}/answers/${answerId}/`);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const getAnswer = async (quizId, questionId, answerId) => {
  try {
    const response = await axiosInstance.get(`/quizzes/${quizId}/questions/${questionId}/answers/${answerId}/`);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const getAnswers = async (quizId, questionId) => {
  try {
    const response = await axiosInstance.get(`/quizzes/${quizId}/questions/${questionId}/answers/`);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}

export const getQuizzesByClassroomId = async (classroomId) => {
  try {
    const response = await axiosInstance.get(`/quizzes/classroom/${classroomId}/`);
    return response;
  } catch (error) {
    throw new Error("An unexpected error occurred:", error.message);
  }
}
