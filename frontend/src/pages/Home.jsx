import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const { logout, auth } = useContext(AuthContext);

  if (!auth) return <p>Loading...</p>;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <header>
        <h1>Welcome to QuizRoom Hub</h1>
        <p>Logged in as: {auth.role === "teacher" ? "Teacher" : "Student"}</p>
        <button
          className="bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300 ease-in-out hover:bg-red-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>
      <main>
        <h1 className="text-4xl font-bold mb-4">Welcome to the Home page!</h1>
        <p className="text-gray-600 mb-6">
          This is a protected page accessible only to authenticated users.
        </p>
        {auth.role === "teacher" ? (
          <div>
            <h2>Your Classrooms</h2>
            {/* Teacher-specific UI */}
          </div>
        ) : (
          <div>
            <h2>Classrooms You've Joined</h2>
            {/* Student-specific UI */}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
