import axios from "axios";
import React, { useState } from "react";
import { getCookies, saveCookie } from "../../utils/cookies";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux/reducers/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { email, password } = formData;
      let response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      console.log({ response });

      const { success, token, details, message } = response.data;

      if (success) {
        alert("Login Success");

        // token save
        saveCookie("anime_access_token", token);

        dispatch(
          authActions.setLogin({
            loginSt: true,
            loginUser: details.user,
          }),
        );

        navigate("/");
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 max-w-md mx-auto p-6  text-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form>
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
            Login
          </button>
        </form>
        <div>
          <p className="mt-4 text-sm text-gray-400 text-center">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
