import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Button } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const AccountPage = () => {
  const { auth } = useContext(AuthContext);

  const handleUpdate = (e) => {
    e.preventDefault();
  };

  const handleDelete = () => {};

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700">User ID:</label>
          <p className="bg-gray-100 p-2 rounded">241</p>
        </div>

        <div>
          <label className="block text-gray-700">Email:</label>
          <p className="bg-gray-100 p-2 rounded">example@example.com</p>
        </div>

        <div>
          <label className="block text-gray-700">Joined Date:</label>
          <p className="bg-gray-100 p-2 rounded">
            {new Date().toLocaleDateString()}
          </p>
        </div>

        <div>
          <label className="block text-gray-700">First Name:</label>
          <input
            type="text"
            defaultValue="first_name"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Last Name:</label>
          <input
            type="text"
            defaultValue="last_name"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Bio:</label>
          <textarea
            defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia magni quam saepe, nulla distinctio voluptatem? Quo adipisci expedita maxime nam beatae, voluptatem, magni ullam architecto molestias perferendis repellat quam libero."
            className="w-full p-2 border border-gray-300 rounded"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-gray-700">Date of Birth:</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker />
          </LocalizationProvider>
        </div>

        {auth.role === "teacher" && (
          <div>
            <label className="block text-gray-700">Years of Experience:</label>
            <input
              type="number"
              defaultValue="15"
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
