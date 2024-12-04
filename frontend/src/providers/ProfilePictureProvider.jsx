import { useState } from "react";
import ProfilePictureContext from "../context/ProfilePictureContext";

const ProfilePictureProvider = ({ children }) => {
  const [profilePicture, setProfilePicture] = useState(
    "/images/default_profile_picture.png"
  );

  return (
    <ProfilePictureContext.Provider value={{ profilePicture, setProfilePicture }}>
      {children}
    </ProfilePictureContext.Provider>
  );
};

export default ProfilePictureProvider;
