import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Admin.css";
import API from "../utils/api";

function getAdminToken() {
  return localStorage.getItem("adminToken");
}

const quickLinks = [
  { to: "/admin/add-product", label: "Add Product", icon: "➕" },
  { to: "/products", label: "View Products", icon: "🗂️" },
  { to: "/admin/order-accept", label: "Manage Orders", icon: "📋" },
  { to: "/users", label: "Manage Users", icon: "👥" },
  { to: "/admin/contact-messages", label: "Contact Messages", icon: "💬" },
]; 

const AdminDashboard = () => {
  const adminToken = getAdminToken();
  const isAdmin = !!adminToken;
  const [stats, setStats] = useState({
    totalProducts: 0,
    orders: 0,
    users: 0,
    lowStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  if (isAdmin && adminToken) {
    API.get("/api/dashboard/dashboard")
      .then((res) => {
        setStats({
          totalProducts: res.data.totalProducts,
          orders: res.data.totalOrders,
          users: res.data.totalUsers,
          lowStock: res.data.lowStock,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
}, [isAdmin, adminToken]);

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return <div>Access denied. Admins only.</div>;
  if (error) return <div>Error: {error}</div>;

  const statsDisplay = [
    { label: "Total Products", value: stats.totalProducts, icon: "📦", color: "#007bff" },
    { label: "Orders", value: stats.orders, icon: "🛒", color: "#28a745" },
    { label: "Users", value: stats.users, icon: "👤", color: "#ff9800" },
    { label: "Low Stock", value: stats.lowStock, icon: "⚠️", color: "#e63946" },
  ];

  return (
    <>
      <div className="admin-dashboard-main">
        <div className="admin-dashboard-header">
          <h1>
            <span className="admin-dashboard-icon">🛠️</span> Admin Dashboard
          </h1>
          <p className="admin-dashboard-tagline">
            Welcome, Admin! Manage your store efficiently from here.
          </p>
        </div>
        <div className="admin-dashboard-stats">
          {statsDisplay.map((stat) => (
            <div className="admin-dashboard-stat-card" key={stat.label} style={{ borderColor: stat.color }}>
              <span className="stat-icon" style={{ color: stat.color }}>{stat.icon}</span>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="admin-dashboard-quicklinks">
          <h2>Quick Actions</h2>
          <div className="admin-dashboard-links-row">
            {quickLinks.map((link) => (
              <Link to={link.to} className="admin-dashboard-link-btn" key={link.label}>
                <span className="link-icon">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="admin-dashboard-footer">
          <div>
            <b>Need help?</b> <a href="mailto:support@trendora.com">Contact Support</a>
          </div>
          <div>
            <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/terms">Terms & Conditions</Link>
          </div>
          <div className="admin-dashboard-quote">
            <span role="img" aria-label="rocket">🚀</span> "Great admin, great store!"
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;