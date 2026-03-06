import React, { useEffect, useState } from "react";
import { getCookies } from "./utils/cookies";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GuardAuth = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let token = getCookies("anime_access_token");
    if (!token) {
      setLoading(false);
    } else {
      axios
        .get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const { success, details } = response.data;
          if (success) {
            navigate("/");
          } else {
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return <h1 className="text-white">Loading.....</h1>;
  }

  return children;
};

export default GuardAuth;
