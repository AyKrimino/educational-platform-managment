import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";

const protectedRoutes = [{ path: "/home", component: Home }];

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          {/* Protected Routes */}
          {protectedRoutes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute>
                  <Component />
                </PrivateRoute>
              }
            />
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
