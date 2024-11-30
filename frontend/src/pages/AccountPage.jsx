import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button } from "@mui/material";
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

const AccountPage = () => {
  const { auth, logout } = useContext(AuthContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [profileData, setProfileData] = useState(null);
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
        setDateOfBirth(data.date_of_birth);
        setYearsOfExperience(data.years_of_experience);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProfile();
  }, [auth]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const userInputs = {
      user_first_name: firstName,
      user_last_name: lastName,
      bio: bio,
      date_of_birth: dateOfBirth ? dateOfBirth.format("YYYY-MM-DD") : null,
      years_of_experience: yearsOfExperience,
    };

    try {
      const data =
        auth.role === "teacher"
          ? await updateTeacherAccount(auth?.access, userInputs)
          : await updateStudentAccount(auth?.access, userInputs);
      setProfileData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      auth.role === "teacher"
        ? await deleteTeacherAccount(auth?.access)
        : await deleteStudentAccount(auth?.access);
      logout();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!profileData) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
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
              onChange={(newDate) => setDateOfBirth(newDate)}
            />
          </LocalizationProvider>
        </div>

        {auth.role === "teacher" && (
          <div>
            <label className="block text-gray-700">Years of Experience:</label>
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

          <Button onClick={handleDelete} variant="contained" color="warning">
            Delete Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountPage;
