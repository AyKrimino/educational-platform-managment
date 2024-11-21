import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  if (auth?.access) return <Navigate to="/home" replace />;
  return children;
};

export default PublicRoute;
