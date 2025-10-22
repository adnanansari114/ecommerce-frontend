import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (token) {
        localStorage.setItem("token", token);
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 500);
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("AuthSuccess Error:", err);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default AuthSuccess;