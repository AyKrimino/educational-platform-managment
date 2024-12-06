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
import ClassroomsPage from "./pages/ClassroomsPage";
import ClassroomPage from "./pages/ClassroomPage";

const publicRoutes = [
  { path: "/", component: Login },
  { path: "/register", component: Register },
];
const protectedRoutes = [
  { path: "/home", component: Home },
  { path: "/account", component: AccountPage },
  { path: "/classrooms", component: ClassroomsPage },
  { path: "/classroom/:classroomId", component: ClassroomPage },
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
          <Route
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
            {protectedRoutes.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Route>

          <Route path="*" element={<div>Route not found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
