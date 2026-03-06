import axios from "axios";
import React, { useState } from "react";
import { saveCookie } from "../../utils/cookies";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { email, password, username } = formData;

      let response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          email,
          password,
          username,
        }
      );

      console.log({ response });

      const { success, token, details, message } = response.data;

      if (success) {
        alert("Register Success");

        // token save
        saveCookie("anime_access_token", token);
        // user info save
        localStorage.setItem("anime_user", JSON.stringify(details.user));
        // redirect to home page
        navigate("/");
      } else {
        alert("Register Failed");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Register Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 max-w-md mx-auto p-6  text-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Register</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-400 text-center">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-blue-500 hover:underline"
          >
            Login here
          </Link>
      </div>
    </div>
    </div>
  );
};

export default Register;
