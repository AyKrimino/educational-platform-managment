import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Stack,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  deleteStudentAccount,
  deleteTeacherAccount,
  getStudentAccount,
  getTeacherAccount,
  updateStudentAccount,
  updateTeacherAccount,
} from "../services/profilesService";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL;

const AccountPage = () => {
  const { auth, logout } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState(""); // (success | warning)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    "/images/default_profile_picture.png"
  );
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data =
          auth.role === "teacher"
            ? await getTeacherAccount(auth?.access)
            : await getStudentAccount(auth?.access);
        setProfileData(data);
        setFirstName(data.user_first_name);
        setLastName(data.user_last_name);
        setBio(data.bio);
        setDateOfBirth(dayjs(data.date_of_birth));
        setYearsOfExperience(data.years_of_experience);
        setProfilePicture(
          data.profile_picture
            ? BASE_URL + data.profile_picture
            : "/images/default_profile_picture.png"
        );
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProfile();
  }, [auth]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formattedDateOfBirth = dateOfBirth
      ? dateOfBirth.format("YYYY-MM-DD")
      : null;

    const userInputs = {
      user_first_name: firstName,
      user_last_name: lastName,
      bio: bio,
      date_of_birth: formattedDateOfBirth,
      years_of_experience: yearsOfExperience,
    };

    const formData = new FormData();
    Object.keys(userInputs).forEach((key) => {
      formData.append(key, userInputs[key]);
    });
    if (file) formData.append("profile_picture", file, file.name);
    

    try {
      const data =
        auth.role === "teacher"
          ? await updateTeacherAccount(auth?.access, formData)
          : await updateStudentAccount(auth?.access, formData);
      setProfileData(data);
      setAlertMessage("Profile updated successfully!");
      setAlertSeverity("success");
      setTimeout(() => {
        setAlertMessage("");
      }, 1500);
    } catch (error) {
      console.error("Error updating the account:", error);

      setAlertMessage("Failed to update profile.");
      setAlertSeverity("warning");
      setTimeout(() => {
        setAlertMessage("");
      }, 1500);
    }
  };

  const handleDelete = async () => {
    try {
      await logout();
      auth.role === "teacher"
        ? await deleteTeacherAccount(auth?.access)
        : await deleteStudentAccount(auth?.access);
      navigate("/");
    } catch (error) {
      console.error("Error deleting the account:", error);

      setAlertMessage("Failed to delete account.");
      setAlertSeverity("warning");
    }
  };

  const openDeleteDialog = () => {
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProfilePicture(URL.createObjectURL(selectedFile));
    }
  };

  if (!profileData) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>
        <Stack spacing={2}>
          <Skeleton variant="text" width="40%" height={40} />
          <Skeleton variant="text" width="60%" height={40} />
          <Skeleton variant="rectangular" height={56} />
          <Skeleton variant="text" width="100%" height={40} />
          <Skeleton variant="rectangular" height={150} />
        </Stack>
      </div>
    );
  }

  return (
    <div className="h-[100%] w-[100%] overflow-y-auto overflow-x-hidden bg-gray-100">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

        {alertMessage && (
          <Stack sx={{ width: "100%", mb: 4 }} spacing={2}>
            <Alert variant="outlined" severity={alertSeverity}>
              {alertMessage}
            </Alert>
          </Stack>
        )}

        <form
          onSubmit={handleUpdate}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="flex justify-center mb-6">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300 object-cover"
            />
          </div>
          <div>
            <label className="block text-gray-700">
              Change Profile Picture:
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">User ID:</label>
            <p className="bg-gray-100 p-2 rounded">{profileData.user_id}</p>
          </div>

          <div>
            <label className="block text-gray-700">Email:</label>
            <p className="bg-gray-100 p-2 rounded">{profileData.user_email}</p>
          </div>

          <div>
            <label className="block text-gray-700">Joined Date:</label>
            <p className="bg-gray-100 p-2 rounded">
              {new Date(profileData.user_date_joined).toLocaleDateString()}
            </p>
          </div>

          <div>
            <label className="block text-gray-700">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Bio:</label>
            <textarea
              value={bio || ""}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-700">Date of Birth:</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dateOfBirth ? dayjs(dateOfBirth) : null}
                onChange={(newDate) => setDateOfBirth(dayjs(newDate))}
              />
            </LocalizationProvider>
          </div>

          {auth.role === "teacher" && (
            <div>
              <label className="block text-gray-700">
                Years of Experience:
              </label>
              <input
                type="number"
                value={yearsOfExperience || ""}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <div className="flex justify-between">
            <Button type="submit" variant="contained" color="primary">
              Update Profile
            </Button>

            <Button
              onClick={openDeleteDialog}
              variant="contained"
              color="error"
            >
              Delete Account
            </Button>
          </div>
        </form>

        <Dialog
          disableRestoreFocus
          open={showDeleteDialog}
          onClose={closeDeleteDialog}
        >
          <DialogTitle>{"Confirm Account Deletion"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete you account? This action is
              irreversible.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default AccountPage;
