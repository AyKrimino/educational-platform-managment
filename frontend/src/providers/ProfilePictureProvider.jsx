import { useContext, useEffect, useState } from "react";
import ProfilePictureContext from "../context/ProfilePictureContext";
import AuthContext from "../context/AuthContext";
import {
  getStudentAccount,
  getTeacherAccount,
} from "../services/profilesService";
import { useLocation } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;

const ProfilePictureProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState(
    "/images/default_profile_picture.png"
  );
  const { auth } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const fetchProfilePicture = async (role, access) => {
      try {
        const response =
          role === "teacher"
            ? await getTeacherAccount(access)
            : await getStudentAccount(access);
        setProfilePicture(
          BASE_URL + response.profile_picture ||
            "/images/default_profile_picture.png"
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfilePicture(auth.role, auth?.access);
  }, [location]);

  return (
    <ProfilePictureContext.Provider
      value={{ profilePicture, setProfilePicture }}
    >
      {children}
    </ProfilePictureContext.Provider>
  );
};

export default ProfilePictureProvider;
