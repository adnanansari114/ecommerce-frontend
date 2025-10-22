import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/User.css";
import API from "../utils/api";
import defaultAvatar from "../assets/default-avatar.png";

const EditProfile = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gender: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: ""
    },
    profilePhoto: "",
  });
  const [photoPreview, setPhotoPreview] = useState(defaultAvatar);
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await API.get("/api/auth/profile");
      setForm({
        name: res.data.name || "",
        phone: res.data.phone || "",
        gender: res.data.gender || "",
        address: {
          street: res.data.address?.street || "",
          city: res.data.address?.city || "",
          state: res.data.address?.state || "",
          zip: res.data.address?.zip || "",
          country: res.data.address?.country || "",
        },
        profilePhoto: res.data.profilePhoto || "",
      });
      setPhotoPreview(res.data.profilePhoto || defaultAvatar);
    } catch {}
    setLoading(false);
  };
  if (userToken) fetchProfile();
}, [userToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = async (e) => {
  const file = e.target.files[0];
  if (file && userToken) {
    setPhotoPreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("profilePhoto", file);
    try {
      const res = await API.post("/api/auth/profile/photo", formData);
      setForm((prev) => ({
        ...prev,
        profilePhoto: res.data.user.profilePhoto || "",
      }));
      setPhotoPreview(res.data.user.profilePhoto || defaultAvatar);
      setMsg("Profile photo updated!");
    } catch {
      setMsg("Photo upload failed.");
    }
    setTimeout(() => setMsg(""), 1500);
  }
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await API.put("/api/auth/profile", {
      name: form.name,
      phone: form.phone,
      gender: form.gender,
      address: form.address,
    });
    setMsg("Profile updated successfully!");
    setTimeout(() => {
      setMsg("");
      navigate("/profile");
    }, 1200);
  } catch {
    setMsg("Update failed.");
  }
};

  if (loading) {
    return (
      <div className="profile-main">
        <div className="profile-card">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-main">
      <form className="profile-card edit-profile-form" onSubmit={handleSubmit}>
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
        <div className="profile-info">
          <div className="profile-info-row">
            <span className="profile-label">Name:</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="profile-info-row">
            <span className="profile-label">Phone:</span>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="profile-info-row">
            <span className="profile-label">Gender:</span>
            <select name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="profile-info-row">
            <span className="profile-label">Street:</span>
            <input
              type="text"
              name="address.street"
              value={form.address.street}
              onChange={handleChange}
            />
          </div>
          <div className="profile-info-row">
            <span className="profile-label">City:</span>
            <input
              type="text"
              name="address.city"
              value={form.address.city}
              onChange={handleChange}
            />
          </div>
          <div className="profile-info-row">
            <span className="profile-label">State:</span>
            <input
              type="text"
              name="address.state"
              value={form.address.state}
              onChange={handleChange}
            />
          </div>
          <div className="profile-info-row">
            <span className="profile-label">Zip:</span>
            <input
              type="text"
              name="address.zip"
              value={form.address.zip}
              onChange={handleChange}
            />
          </div>
          <div className="profile-info-row">
            <span className="profile-label">Country:</span>
            <input
              type="text"
              name="address.country"
              value={form.address.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="edit-profile-btn" type="submit">
          Save Changes
        </button>
        {msg && <div className="profile-msg">{msg}</div>}
      </form>
    </div>
  );
};

export default EditProfile;