import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
];
const protectedRoutes = [{ path: "/home", component: Home }];

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes for unauthenticated (anonymous) users only */}
          {publicRoutes.map(({ path, component: Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <PublicRoute>
                  <Component />
                </PublicRoute>
              }
            />
          ))}

          {/* Protected routes for authenticated users only */}
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
