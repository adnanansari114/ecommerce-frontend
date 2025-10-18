import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash; // #token=xyz
    const token = hash.split("=")[1];

    if (token) {
      localStorage.setItem("token", token);
      console.log("✅ Token saved:", token);
      navigate("/"); // redirect to home page
    } else {
      console.error("❌ Token not found in URL hash");
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default AuthSuccess;
