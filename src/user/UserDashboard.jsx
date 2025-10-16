import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import defaultAvatar from "../assets/default-avatar.png";

const UserDashboard = () => {
  const [stats, setStats] = useState(null);
  const [user, setUser] = useState({});
  const userToken = localStorage.getItem("token");

  useEffect(() => {
  API.get("/api/dashboard/user")
    .then(res => setStats(res.data));
  
  API.get("/api/auth/profile")
    .then(res => setUser(res.data));
}, [userToken]);

  if (!stats || !user) return <div>Loading...</div>;

  return (
    <div className="user-dashboard-main">
      <div className="user-dashboard-header">
        <img
          src={user.profilePhoto || defaultAvatar}
          alt="Profile"
          className="user-dashboard-avatar"
          onError={e => { e.target.src = defaultAvatar; }}
        />
        <h1>Welcome, {user.name}</h1>
        <p className="user-dashboard-email">{user.email}</p>
      </div>
      <div className="user-dashboard-stats">
        <Link to="/order-history" className="user-dashboard-stat-card">
          <span className="user-stat-icon">🛒</span>
          <div className="user-stat-value">{stats.orders}</div>
          <div className="user-stat-label">Orders</div>
        </Link>
        <Link to="/wishlist" className="user-dashboard-stat-card">
          <span className="user-stat-icon">❤️</span>
          <div className="user-stat-value">{stats.wishlist}</div>
          <div className="user-stat-label">Wishlist</div>
        </Link>
        <Link to="/cart" className="user-dashboard-stat-card">
          <span className="user-stat-icon">🛍️</span>
          <div className="user-stat-value">{stats.cart}</div>
          <div className="user-stat-label">Cart</div>
        </Link>
        <Link to="/profile" className="user-dashboard-stat-card">
          <span className="user-stat-icon">🏠</span>
          <div className="user-stat-value">{stats.addresses}</div>
          <div className="user-stat-label">Addresses</div>
        </Link>
      </div>
      {/* Add quick links and footer as needed */}
    </div>
  );
};

export default UserDashboard;