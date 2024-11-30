import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const PrivateLayout = () => {
  return (
    <div className="h-screen overflow-hidden">
      <Header />
      <main className="h-full overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
