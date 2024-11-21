import { useContext, useState } from "react";
import AuthSidePanel from "../components/AuthSidePanel";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const credentials = {
      email,
      password,
    };

    try {
      await login(credentials);
      navigate("/home");
    } catch (error) {
      console.log("Login failed: ", error);

      if (error && typeof error === "object") {
        if (
          Object.keys(error).length > 0 &&
          typeof error[Object.keys(error)[0]] === "object"
        ) {
          const errors = Object.keys(error).map(
            (key) => `${key}: ${error[key][0]}`
          );
          setErrorMessage(errors.join("\n"));
        } else if (Array.isArray(error)) {
          setErrorMessage(error.join("\n"));
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      } else {
        setErrorMessage(
          "Unable to connect to the server. Please try again later."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <AuthSidePanel />
      <div className="flex flex-col justify-center items-center p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Login</h1>
        <p className="text-gray-600 mb-6 text-justify">
          If you already have an account, log in easily.
        </p>
        {errorMessage && (
          <div className="text-red-600 mb-2 text-justify">
            <ul>
              {errorMessage.split("\n").map((msg, index) => (
                <li key={index}>• {msg}</li>
              ))}
            </ul>
          </div>
        )}
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-2 w-80 mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded-lg p-2 w-80 mb-6"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`${
              isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600"
            } text-white py-2 px-4 rounded-lg w-80 mb-4 transition-all duration-300 ease-in-out`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
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
        </form>
      </div>
    </div>
  );
};

export default Login;
