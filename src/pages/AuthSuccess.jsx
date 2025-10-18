import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash; // e.g. #token=xyz
    if (hash && hash.includes("token=")) {
      const token = hash.split("token=")[1];
      if (token) {
        localStorage.setItem("token", token);

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9f9f9",
      }}
    >
      <h2 style={{ color: "#333" }}>Logging you in...</h2>
      <p style={{ color: "#666" }}>Please wait a moment.</p>
    </div>
  );
};

export default AuthSuccess;
