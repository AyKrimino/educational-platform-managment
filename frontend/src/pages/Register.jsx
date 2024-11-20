import AuthSidePanel from "../components/AuthSidePanel";
import { Radio, RadioGroup } from "@headlessui/react";
import { CiCircleCheck } from "react-icons/ci";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";

const roles = [
  {
    name: "Teacher",
    description:
      "Create classrooms, post quizzes, moderate comments, and manage students effectively.",
  },
  {
    name: "Student",
    description:
      "Join classrooms, take quizzes, comment on posts, and participate actively in learning.",
  },
];

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const isTeacher = selectedRole.name === "Teacher";
    const userDetails = {
      email,
      first_name: firstname,
      last_name: lastname,
      is_teacher: isTeacher,
      password,
      password2: confirmPassword,
    };
    try {
      await register(userDetails);
      navigate("/home");
    } catch (error) {
      console.log("Registration failed:", error);

      if (error && typeof error === "object") {
        const errors = Object.keys(error).map(
          (key) => `${key}: ${error[key][0]}`
        );
        setErrorMessage(errors.join("\n"));
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
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <p className="text-gray-600 mb-6 text-justify">
          If you don't have an account. Register now easily.
        </p>
        {errorMessage && (
          <div className="text-red-600 mb-2 text-justify">
            <ul>
              {errorMessage.split("\n").map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <input
            className="border rounded-lg p-2 w-80 mb-4"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border rounded-lg p-2 w-80 mb-4"
            type="text"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            className="border rounded-lg p-2 w-80 mb-4"
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <RadioGroup
            by="name"
            value={selectedRole}
            onChange={setSelectedRole}
            aria-label="Server size"
            className="space-y-4 w-80 mb-4"
          >
            {roles.map((role) => (
              <Radio
                key={role.name}
                value={role}
                className="group relative flex cursor-pointer rounded-lg bg-blue-50 py-4 px-5 shadow-md transition duration-300 ease-in-out focus:outline-none data-[focus]:outline-2 data-[focus]:outline-blue-500 data-[checked]:bg-blue-500 data-[checked]:text-white mb-2"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="text-sm/6">
                    <p className="font-semibold text-blue-600 group-data-[checked]:text-white">
                      {role.name}
                    </p>
                    <div className="flex gap-2 text-xs text-blue-500/80 group-data-[checked]:text-blue-200">
                      <div>{role.description}</div>
                    </div>
                  </div>
                  <CiCircleCheck className="size-10 text-blue-600 opacity-0 transition group-data-[checked]:opacity-100 group-data-[checked]:text-white" />
                </div>
              </Radio>
            ))}
          </RadioGroup>

          <input
            className="border rounded-lg p-2 w-80 mb-4"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border rounded-lg p-2 w-80 mb-4"
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="submit"
            className={`${
              isLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600"
            } text-white py-2 px-4 rounded-lg w-80 mb-4 transition-all duration-300 ease-in-out`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Already have an account?</p>
            <Link
              to="/"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
