import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const PrivateLayout = () => {
  return (
    <div className="h-full overflow-hidden">
      <Header />
      <main className="h-[92%] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default PrivateLayout;
