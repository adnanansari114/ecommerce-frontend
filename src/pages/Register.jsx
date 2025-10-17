import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Pages.css";
import API from "../utils/api";

const Register = () => {
  const [form, setForm] = useState({
  name: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  agreed: false,
});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   // Validation (SAME - NO CHANGE!)
//   if (!form.name || !form.username || !form.email || !form.password || !form.confirmPassword || !form.phone) {
//     setError("Please fill all required fields.");
//     return;
//   }
//   if (form.password.length < 6) {
//     setError("Password must be at least 6 characters.");
//     return;
//   }
//   if (form.password !== form.confirmPassword) {
//     setError("Passwords do not match.");
//     return;
//   }
//   if (!form.agreed) {
//     setError("You must agree to the terms and privacy policy.");
//     return;
//   }

//   // API call
//   try {
//     const res = await API.post("/api/auth/register", {
//       name: form.name,
//       username: form.username,
//       email: form.email,
//       phone: form.phone,
//       password: form.password,
//       confirmPassword: form.confirmPassword,
//       agreed: form.agreed
//     });
//     setSubmitted(true);
//     setTimeout(() => {
//       setSubmitted(false);
//       navigate("/login");
//     }, 1500);
//     setForm({
//       name: "",
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//       agreed: false,
//     });
//   } catch (err) {
//     setError(err.response?.data?.msg || "Registration failed.");
//   }
// };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    // First Step — send OTP
    const res = await API.post("/api/auth/register", form);
    setOtpSent(true);
    alert("OTP sent to your email!");
  } catch (err) {
    setError(err.response?.data?.msg || "Error sending OTP");
  }
};
const handleVerifyOTP = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/api/auth/verify-otp", { ...form, otp });
    alert("Registration Successful!");
    navigate("/login");
  } catch (err) {
    setError(err.response?.data?.msg || "Invalid OTP");
  }
};


  const handleGoogle = () => {
  const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  window.location.href = `${base}/api/auth/google`;
}; 

  return (
    <div className="register-main">
      <div className="register-hero">
        <div className="register-hero-bg"></div>
        <div className="register-hero-content">
          <h1 className="register-title">Create Your <span>Trendora</span> Account</h1>
          <p className="register-subtitle">
            Join Trendora and start shopping the latest trends!
          </p>
        </div>
      </div>
      <div className="register-content">
        {!otpSent ? (
        <form className="register-form animate-pop-in" onSubmit={handleSubmit} autoComplete="off">
          <h2>Register</h2>
          <div className="form-group">
            <label>Name <span>*</span></label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label>Username <span>*</span></label>
            <input
              name="username"
              type="text"
              required
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label>Email <span>*</span></label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label>Phone <span>*</span></label>
            <input
              name="phone"
              type="tel"
              required
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              pattern="[0-9]{10}"
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
              placeholder="Password (min 6 chars)"
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password <span>*</span></label>
            <input
              name="confirmPassword"
              type="password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              autoComplete="new-password"
            />
          </div>
          <div className="form-groups checkbox-group">
            <input
              name="agreed"
              type="checkbox"
              checked={form.agreed}
              onChange={handleChange}
              id="agreed"
              required
            />
            <label htmlFor="agreed" className="agree-label">
              I agree to the <Link to="/terms">Terms</Link> & <Link to="/privacy-policy">Privacy Policy</Link>
            </label>
          </div>
          
          <button className="register-btn" type="submit">
            Register
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
                <span className="google-icon">🔵</span> Register with Google
              </>
            )}
          </button>
          {error && <div className="register-error animate-fade-in">{error}</div>}
          {submitted && (
            <div className="register-success animate-fade-in">
              <span role="img" aria-label="Success">✅</span> Registration successful!
            </div>
          )}
          <div className="register-login-link">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </form>
        
  // show registration form
) : (
  <div className="register-form">
  <form onSubmit={handleVerifyOTP}>
    <h2>Enter OTP</h2>
    <div className="form-group">
    <input
      type="text"
      placeholder="Enter 6-digit OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      required
    />
    </div>
    <button className="register-btn" type="submit">Verify OTP</button>
  </form>
  </div>
)}

        <div className="register-info animate-slide-in">
          <h2>Why Join Trendora?</h2>
          <ul>
            <li>🛒 Shop trending products at best prices</li>
            <li>🔒 Secure & fast checkout</li>
            <li>🚚 Track your orders easily</li>
            <li>🎁 Get exclusive offers & updates</li>
          </ul>
        </div>
      </div>
      <div className="register-footer">
        <span className="register-heart">♥</span> Welcome to the Trendora family!
      </div>
    </div>
  );
};

export default Register;