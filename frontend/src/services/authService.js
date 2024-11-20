import axiosInstance from "./axiosInstance";

/**
 * Register a new user.
 * @param {Object} userDetails - The user details for registration.
 * @returns {Promise<Object>} - The server response.
 */
export const register = async (userDetails) => {
  try {
    const response = await axiosInstance.post("/register/", userDetails);
    if (response.status === 201) return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * Login a user.
 * @param {Object} credentials - The user credentials.
 * @returns {Promise<Object>} - The server response containing tokens.
 */
export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post("/login/", credentials);
    if (response.status === 200) return response;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * Logout the current user.
 * @param {Object} credentials - The user credentials.
 * @returns {Promise<void>}
 */
export const logout = async (credentials) => {
  try {
    const response = await axiosInstance.post("/logout/", credentials);
    if (response.status === 205) return;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

/**
 * Refresh the access token.
 * @param {string} refreshToken - The refresh token.
 * @returns {Promise<Object>} - The new access token.
 */
export const refresh = async (refreshToken) => {
  try {
    const response = await axiosInstance.post("/token/refresh/", {
      refresh: refreshToken,
    });
    if (response.status === 200) return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};
