import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getStudentAccount, getTeacherAccount } from "../services/profilesService";

const AccountPage = () => {
  const { auth } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data =
          auth.role === "teacher"
            ? await getTeacherAccount(auth?.access)
            : await getStudentAccount(auth?.access);
        setProfileData(data);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchProfile();
  }, [auth]);

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  const handleDelete = () => {};

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
            defaultValue={profileData.user_first_name}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Last Name:</label>
          <input
            type="text"
            defaultValue={profileData.user_last_name}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Bio:</label>
          <textarea
            defaultValue={profileData.bio}
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-gray-700">Date of Birth:</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker defaultValue={profileData.date_of_birth} />
          </LocalizationProvider>
        </div>

        {auth.role === "teacher" && (
          <div>
            <label className="block text-gray-700">Years of Experience:</label>
            <input
              type="number"
              defaultValue={profileData.years_of_experience}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        <div className="flex justify-between">
          <Button variant="contained" color="primary">
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
