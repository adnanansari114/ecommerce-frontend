import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/Pages.css";
import API from "../utils/api";

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email) {
      setError("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await API.post("/api/auth/forgot-password", { email: form.email });
      setSuccess("OTP sent to your email!");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.otp) {
      setError("Please enter OTP");
      return;
    }

    setLoading(true);
    try {
      // For now, just proceed (actual verification happens in reset)
      setStep(3);
    } catch (err) {
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.newPassword || !form.confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await API.post("/api/auth/reset-password", form);
      setSuccess("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-main">
      <div className="register-hero">
        <div className="register-hero-bg"></div>
        <div className="register-hero-content">
          <h1 className="register-title">Forgot Password</h1>
          <p className="register-subtitle">
            {step === 1 && "Enter your email to reset password"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Set your new password"}
          </p>
        </div>
      </div>
      <div className="register-content">
        <form className="register-form animate-pop-in" onSubmit={step === 1 ? handleSendOTP : step === 2 ? handleVerifyOTP : handleResetPassword}>
          <h2>{step === 1 ? "Enter Email" : step === 2 ? "Verify OTP" : "New Password"}</h2>

          {step === 1 && (
            <div className="form-group">
              <label>Email <span>*</span></label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label>OTP <span>*</span></label>
                <input
                  name="otp"
                  type="text"
                  maxLength="6"
                  value={form.otp}
                  onChange={handleChange}
                  placeholder="Enter 6-digit OTP"
                  required
                />
              </div>
              <div className="form-group">
                <label>Didn't receive OTP?</label>
                <button type="button" className="resend-btn" onClick={() => setStep(1)}>
                  Resend OTP
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="form-group">
                <label>New Password <span>*</span></label>
                <input
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirm New Password <span>*</span></label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  required
                />
              </div>
            </>
          )}

          <button className="register-btn" type="submit" disabled={loading}>
            {loading 
              ? "Processing..." 
              : step === 1 ? "Send OTP" 
              : step === 2 ? "Verify OTP" 
              : "Reset Password"
            }
          </button>

          {error && <div className="register-error animate-fade-in">{error}</div>}
          {success && <div className="register-success animate-fade-in">{success}</div>}

          <div className="register-login-link">
            <button type="button" className="back-btn" onClick={() => navigate("/login")}>
              ← Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;