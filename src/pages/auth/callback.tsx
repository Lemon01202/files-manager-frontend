import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {userStore} from "../../stores/userStore";

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");

    if (token) {
      localStorage.setItem("token", token);
      userStore.setUserEmail(email);
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return null;
};

export default Callback;
