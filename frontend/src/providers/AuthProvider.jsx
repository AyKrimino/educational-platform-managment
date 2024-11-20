import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import AuthContext from "../context/AuthContext";

/**
 * AuthProvider component to manage authentication state and provide it to the app.
 */
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const tokens = JSON.parse(localStorage.getItem("authTokens"));
    return tokens ? { ...tokens } : null;
  });

  /**
   * Login function.
   * @param {Object} credentials - User email and password.
   */
  const login = async (credentials) => {
    try {
      const response = await axiosInstance.post("/login/", credentials);
      const { access, refresh } = response.data.tokens;

      localStorage.setItem("authTokens", JSON.stringify({ access, refresh }));
      setAuth({ access, refresh });
    } catch (error) {
      console.log("Login failed", error);
      throw error;
    }
  };

  /**
   * Logout function.
   */
  const logout = () => {
    localStorage.removeItem("authTokens");
    setAuth(null);
  };

  /**
   * Refresh the access token.
   */
  const refreshAccessToken = async () => {
    if (!auth?.refresh) {
      console.warn("No refresh token available. Cannot refresh access token.");
      return; // Early return if no refresh token is found
    }

    try {
      const response = await axiosInstance.post("/token/refresh/", {
        refresh: auth.refresh,
      });
      const { access } = response.data;

      const updatedTokens = { ...auth, access };
      localStorage.setItem("authTokens", JSON.stringify(updatedTokens));
      setAuth(updatedTokens);
    } catch (error) {
      console.error("Token refresh failed", error);
      logout(); // Log out the user if refreshing fails
    }
  };

  // Auto-refresh token before expiry
  useEffect(() => {
    if (auth?.access) {
      const payload = JSON.parse(atob(auth.access.split(".")[1]));

      const expiryTime = payload.exp * 1000 - Date.now() - 5000;

      if (expiryTime > 0) {
        const timer = setTimeout(refreshAccessToken, expiryTime);
        return () => clearTimeout(timer);
      } else {
        refreshAccessToken();
      }
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, login, logout, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
