import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Header from "../components/Header";
import WelcomeBack from "../components/WelcomBack";

const Home = () => {
  const { logout, auth } = useContext(AuthContext);

  if (!auth) return <p>Loading...</p>;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="h-screen w-[100%] overflow-y-auto overflow-x-hidden bg-gray-100">
      <Header />
      <WelcomeBack />
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
