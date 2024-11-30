import axiosInstance from "./axiosInstance";

/**
 * Get Teacher account by user id.
 * @param {String} accessToken - The user access token to pass it to headers.
 * @returns {Promise<Object>} - The server response.
 */
export const getTeacherAccount = async (accessToken) => {
  try {
    const response = await axiosInstance.get("/profiles/teachers/me/", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teacher account:", error);
    throw new Error("Unable to fetch teacher account.");
  }
};

/**
 * Get Student account by user id.
 * @param {String} accessToken - The user access token to pass it to headers.
 * @returns {Promise<Object>} - The server response.
 */
export const getStudentAccount = async (accessToken) => {
  try {
    const response = await axiosInstance.get("/profiles/students/me/", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching student account:", error);
    throw new Error("Unable to fetch student account.");
  }
};
