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
 * Update Teacher account by user id.
 * @param {String} accessToken - The user access token to pass it to headers.
 * @param {Object} requestBody - The request body to be changed
 * @returns {Promise<Object>} - The server response.
 */
export const updateTeacherAccount = async (accessToken, requestBody) => {
  try {
    const response = await axiosInstance.put(
      "/profiles/teachers/me/",
      requestBody,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating teacher account:", error);
    throw new Error("Unable to update teacher account.");
  }
};

/**
 * Delete Teacher account by user id
 * @param {String} accessToken - the user access token to pass it to headers
 * @returns {Promise<void>}
 */
export const deleteTeacherAccount = async (accessToken) => {
  try {
    await axiosInstance.delete("/profiles/teachers/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.error("Error deleting teacher account:", error);
    throw new Error("Unable to delete teacher account.");
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

/**
 * Update Student account by user id.
 * @param {String} accessToken - The user access token to pass it to headers.
 * @param {Object} requestBody - The request body to be changed
 * @returns {Promise<Object>} - The server response.
 */
export const updateStudentAccount = async (accessToken, requestBody) => {
  try {
    const response = await axiosInstance.put(
      "/profiles/students/me/",
      requestBody,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating student account:", error);
    throw new Error("Unable to update student account.");
  }
};

/**
 * Delete Student account by user id
 * @param {String} accessToken - the user access token to pass it to headers
 * @returns {Promise<void>}
 */
export const deleteStudentAccount = async (accessToken) => {
  try {
    await axiosInstance.delete("/profiles/students/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  } catch (error) {
    console.error("Error deleting student account:", error);
    throw new Error("Unable to delete student account.");
  }
};
