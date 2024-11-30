import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import WelcomeBack from "../components/WelcomBack";
import ListClassroomCards from "../features/classrooms/ListClassroomCards";

const Home = () => {
  const { auth } = useContext(AuthContext);

  if (!auth) return <p>Loading...</p>;

  return (
    <div className="h-screen w-[100%] overflow-y-auto overflow-x-hidden bg-gray-100">
      <WelcomeBack />
      <ListClassroomCards />
    </div>
  );
};

export default Home;
