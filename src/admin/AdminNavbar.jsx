import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Admin.css"; 

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/allproducts">All Products</Link>
        </li>
        <li>
          <Link to="/admin/add-product">Add Product</Link>
        </li>
        <li>
          <Link to="/admin/order-accept">Order Accept</Link>
        </li>
        <li>
          <Link to="/admin/order-detail">Order Details</Link>
        </li>
        <li>
          <Link to="/admin/categories">Add Category</Link>
        </li>
        <li style={{ float: "right" }}>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;