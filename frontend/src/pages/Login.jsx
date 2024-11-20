import AuthSidePanel from "../components/AuthSidePanel";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <AuthSidePanel />
      <div className="flex flex-col justify-center items-center p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <p className="text-gray-600 mb-6">
          If you already have an account, log in easily.
        </p>
        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg p-2 w-80 mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg p-2 w-80 mb-6"
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-80 mb-4 hover:bg-blue-700 transition-all duration-300 ease-in-out">
          Login
        </button>
        <div className="text-center">
          <p className="text-gray-600 mb-2">Don't have an account?</p>
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
