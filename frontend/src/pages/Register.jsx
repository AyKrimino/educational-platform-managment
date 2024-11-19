import AuthSidePanel from "../components/AuthSidePanel";
import { Radio, RadioGroup } from "@headlessui/react";
import { CiCircleCheck } from "react-icons/ci";
import { useState } from "react";

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
  const [selected, setSelected] = useState(roles[0]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <AuthSidePanel />
      <div className="flex flex-col justify-center items-center p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Register</h1>
        <p className="text-gray-600 mb-6">
          If you don't have an account. Register now easily.
        </p>
        <input
          className="border rounded-lg p-2 w-80 mb-4"
          type="email"
          placeholder="Email"
        />
        <input
          className="border rounded-lg p-2 w-80 mb-4"
          type="text"
          placeholder="Firstname"
        />
        <input
          className="border rounded-lg p-2 w-80 mb-4"
          type="text"
          placeholder="Lastname"
        />

        <RadioGroup
          by="name"
          value={selected}
          onChange={setSelected}
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
        />
        <input
          className="border rounded-lg p-2 w-80 mb-4"
          type="password"
          placeholder="Confirm Password"
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-80 mb-4 hover:bg-blue-700 transition-all duration-300 ease-in-out">
          Register
        </button>
        <div className="text-center">
          <p className="text-gray-600 mb-2">Already have an account?</p>
          <button className="text-blue-600 font-semibold hover:underline">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
