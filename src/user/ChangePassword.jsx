import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages.css";
import API from "../utils/api";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await API.put("/api/auth/change-password", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess(res.data.msg);
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-main">
      <div className="register-hero">
        <div className="register-hero-bg"></div>
        <div className="register-hero-content">
          <h1 className="register-title">Change Password</h1>
          <p className="register-subtitle">Update your password securely</p>
        </div>
      </div>
      <div className="register-content">
        <form className="register-form animate-pop-in" onSubmit={handleSubmit}>
          <h2>Change Password</h2>
          
          <div className="form-group">
            <label>Old Password <span>*</span></label>
            <input
              name="oldPassword"
              type="password"
              value={form.oldPassword}
              onChange={handleChange}
              placeholder="Enter your current password"
              autoComplete="current-password"
            />
          </div>

          <div className="form-group">
            <label>New Password <span>*</span></label>
            <input
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              autoComplete="new-password"
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
              autoComplete="new-password"
            />
          </div>

          <button className="register-btn" type="submit" disabled={loading}>
            {loading ? "Changing..." : "Change Password"}
          </button>

          {error && <div className="register-error animate-fade-in">{error}</div>}
          {success && <div className="register-success animate-fade-in">{success}</div>}

          <div className="register-login-link">
            <button 
              type="button" 
              className="back-btn"
              onClick={() => navigate("/profile")}
            >
              ← Back to Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;