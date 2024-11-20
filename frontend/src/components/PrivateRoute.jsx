import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (!auth?.access) return <Navigate to="/" replace />;
  return children;
};

export default PrivateRoute;
