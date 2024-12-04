import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AuthProvider from "./providers/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AccountPage from "./pages/AccountPage";
import PrivateLayout from "./layouts/PrivateLayout";
import ProfilePictureProvider from "./providers/ProfilePictureProvider";
import ClassroomProvider from "./providers/ClassroomProvider";

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
];
const protectedRoutes = [
  { path: "/home", component: Home },
  { path: "/account", component: AccountPage },
];

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
                  <ProfilePictureProvider>
                    <ClassroomProvider>
                      <PrivateLayout />
                    </ClassroomProvider>
                  </ProfilePictureProvider>
                </PrivateRoute>
              }
            >
              <Route path={path} element={<Component />} />
            </Route>
          ))}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
