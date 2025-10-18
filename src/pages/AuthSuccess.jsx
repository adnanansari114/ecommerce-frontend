// src/pages/AuthSuccess.jsx
import React, { useEffect } from "react";

const AuthSuccess = () => {
  useEffect(() => {
    // token URL hash se nikalna
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.replace("#", "?")).get("token");

    if (token) {
      // localStorage me save karo
      localStorage.setItem("token", token);
      // user ko home ya dashboard page pe bhej do
      window.location.href = "/";
    } else {
      console.error("Token not found in URL!");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default AuthSuccess;
