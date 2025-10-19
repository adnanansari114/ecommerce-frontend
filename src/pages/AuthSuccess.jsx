import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (token) {
    localStorage.setItem("token", token);
    navigate("/");
    window.location.reload();
  } else {
    navigate("/login");
  }
}, [navigate]);


  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default AuthSuccess;
