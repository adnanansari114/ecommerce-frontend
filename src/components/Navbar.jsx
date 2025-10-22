import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);  
  const user = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img
            src="/logo192.png"
            alt="Trendora Logo"
            className="logo-img"
          />
        </Link>
        <span className="logo-text">Trendora</span>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>
      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </div>
      </div>

      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
      <div className="navbar-auth">
        {!user ? (
          <>
            <Link className="login-btn" to="/login">Login</Link>
            <Link className="register-btn" to="/register">Register</Link>
          </>
        ) : (
          <>
          <div className="pro-detail">
          <div className="pro-detail1">
            <Link className="wishlist-btn" to="/wishlist" title="Wishlist">
              <span role="img" aria-label="Wishlist">🤍</span>
            </Link>
            <Link id="cart-btn" to="/cart" title="Cart">
              <span role="img" aria-label="Cart">🛒</span>
            </Link>
            <Link className="profile-btn" to="/profile" title="Profile">
              <span role="img" aria-label="Profile">👤</span>
            </Link>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;