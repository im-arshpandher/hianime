import React, { useEffect, useState } from "react";
import { getCookies, removeCookies } from "../../utils/cookies";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Loginbtn = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });
  // const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // // get User if login
  // useEffect(() => {
  //   let token = getCookies("anime_access_token");
  //   if (token) {
  //     let userString = localStorage.getItem("anime_user");
  //     if (userString) {
  //       setUser(JSON.parse(userString));
  //     }
  //   }
  // }, []);

  const logoutNow = () => {
    removeCookies("anime_access_token");
    window.location.reload();
  };

  return (
    <div className="loginbtn ml-5">
      {!user ? (
        <Link
          to={"/auth/login"}
          className="bg-pink-300 text-black flex justify-center items-center rounded-md w-20 h-10 px-4 font-semibold cursor-pointer hover:bg-pink-400 transition duration-300"
          type="login"
        >
          Login
        </Link>
      ) : (
        <div className="flex items-center gap-2">
         <Link to={"/auth/profile"}> <h1 className="text-white font-medium">Hello, {user.username}</h1></Link>
          <button
            onClick={logoutNow}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400 transition duration-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Loginbtn;
