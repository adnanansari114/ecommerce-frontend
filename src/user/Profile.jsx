import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/User.css";
import defaultAvatar from "../assets/default-avatar.png";
import API from "../utils/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(defaultAvatar);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/api/auth/profile");
        setUser(res.data);
        setPhotoPreview(res.data.profilePhoto || defaultAvatar);
      } catch {
        setUser(null);
      }
    };
    if (userToken) fetchProfile();
  }, [userToken]);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file && userToken) {
      setPhotoPreview(URL.createObjectURL(file));
      const formData = new FormData();
      formData.append("profilePhoto", file);
      try {
        const res = await API.post("/api/auth/profile/photo", formData);
        setUser(res.data.user);
        setPhotoPreview(res.data.user.profilePhoto || defaultAvatar);
      } catch {
      }
    }
  };

  const handleEdit = () => {
    navigate("/user/edit-profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-main">
        <div className="profile-card">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-main profile-flex">
      <div className="profile-card profile-left">
        <div className="profile-photo-section">
          <img
            src={photoPreview}
            alt="Profile"
            className="profile-photo"
            onError={e => { e.target.src = defaultAvatar; }}
          />
          <label className="change-photo-btn">
            Change Photo
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handlePhotoChange}
            />
          </label>
        </div>
        <button className="edit-profile-btn" onClick={handleEdit}>
          Edit Details
        </button>
        <div className="profile-info">
          <h2>{user.name}</h2>
          <div className="profile-info-row">
            <span className="profile-label">Phone:</span>
            <span>{user.phone || "—"}</span>
          </div>
          <div className="profile-info-row">
            <span className="profile-label">Gender:</span>
            <span>{user.gender || "—"}</span>
          </div>
          <div className="profile-info-row">
            <span className="profile-label">Address:</span>
            <span>
              {user.address
                ? `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zip}, ${user.address.country}`
                : "—"}
            </span>
          </div>
        </div>
      </div>
      <div className="profile-options-card">
        <h3 className="profile-options-title">My Options</h3>
        <ul className="profile-options-list">
          <li>
            <button className="profile-option-btn" onClick={() => navigate("/track-order")}>
              📦 Track Order
            </button>
          </li>
          <li>
            <button className="profile-option-btn" onClick={() => navigate("/dashboard")}>
              🏠 User Dashboard
            </button>
          </li>
          <li>
            <button className="profile-option-btn" onClick={() => navigate("/order-history")}>
              🛒 Orders History
            </button>
          </li>
          <li>
            <button className="profile-option-btn" onClick={() => navigate("/change-password")}>
              🛒 Change Password
            </button>
          </li>
          <li>
            <button className="profile-option-btn logout" onClick={handleLogout}>
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;