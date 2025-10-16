import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Pages.css";
import API from "../utils/api";

const Login = () => {
  const [form, setForm] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   if (!form.usernameOrEmail || !form.password) {
  //     setError("Please fill all required fields.");
  //     return;
  //   }
  //   if (form.password.length < 6) {
  //     setError("Password must be at least 6 characters.");
  //     return;
  //   }

  //   // API call
  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         usernameOrEmail: form.usernameOrEmail,
  //         password: form.password,
  //       }),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       setError(data.msg || "Login failed.");
  //       return;
  //     }
  //     // Save token to localStorage
  //     localStorage.setItem("token", data.token);
  //     localStorage.setItem("user", JSON.stringify(data.user));
  //     setSubmitted(true);
  //     setTimeout(() => {
  //       setSubmitted(false);
  //       navigate("/");
  //       window.location.reload(); // To update Navbar
  //     }, 1000);
  //     setForm({
  //       usernameOrEmail: "",
  //       password: "",
  //     });
  //   } catch (err) {
  //     setError("Server error. Please try again.");
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setMsg("");
  
  // VALIDATION FIRST!
  if (!form.usernameOrEmail || !form.password) {
    setError("Please fill all required fields.");
    return;
  }
  
  // Admin login check
  if (form.usernameOrEmail === "admin@trendora.com") {
    try {
      const res = await API.post("/api/auth/admin/login", { 
        email: form.usernameOrEmail, 
        password: form.password 
      });
      localStorage.setItem("adminToken", res.data.token);
      setSubmitted(true);  // SUCCESS MSG!
      setTimeout(() => navigate("/admin/dashboard"), 1000);
    } catch (err) {
      setError(err.response?.data?.msg || "Admin login failed.");  // ERROR DIV!
    }
  } else {
    // Normal user login
    try {
      const res = await API.post("/api/auth/login", {
        usernameOrEmail: form.usernameOrEmail,
        password: form.password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        navigate("/");
        window.location.reload();
      }, 1000);
      setForm({ usernameOrEmail: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed.");
    }
  }
};

  const handleGoogle = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }, 2000);
  };

  return (
    <div className="register-main">
      <div className="register-hero">
        <div className="register-hero-bg"></div>
        <div className="register-hero-content">
          <h1 className="register-title">Login to <span>Trendora</span></h1>
          <p className="register-subtitle">
            Welcome back! Please login to your account.
          </p>
        </div>
      </div>
      <div className="register-content">
        <form className="register-form animate-pop-in" onSubmit={handleSubmit} autoComplete="off">
          <h2>Login</h2>
          <div className="form-group">
            <label>Email <span>*</span></label>
            <input
              name="usernameOrEmail"
              type="usernameOrEmail"
              required
              value={form.usernameOrEmail}
              onChange={handleChange}
              placeholder="you@email.com"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label>Password <span>*</span></label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <button className="register-btn" type="submit">
            Login
          </button>
          <button
            className="google-btn"
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
          >
            {googleLoading ? (
              <span className="google-spinner"></span>
            ) : (
              <>
                <span className="google-icon">🔵</span> Login with Google
              </>
            )}
          </button>
          {error && <div className="register-error animate-fade-in">{error}</div>}
          {submitted && (
            <div className="register-success animate-fade-in">
              <span role="img" aria-label="Success">✅</span> Login successful!
            </div>
          )}
          <div className="register-login-link">
            New to Trendora? <Link to="/register">Register here</Link>
          </div>
        </form>
        <div className="register-info animate-slide-in">
          <h2>Why Login?</h2>
          <ul>
            <li>🛒 Access your orders & wishlist</li>
            <li>🔒 Secure & fast checkout</li>
            <li>🚚 Track your deliveries</li>
            <li>🎁 Get exclusive member offers</li>
          </ul>
        </div>
      </div>
      <div className="register-footer">
        <span className="register-heart">♥</span> Happy to see you again!
      </div>
    </div>
  );
};

export default Login;