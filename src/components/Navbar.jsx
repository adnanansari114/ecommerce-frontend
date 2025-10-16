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
      {/* Left: Logo */} 
      <div className="navbar-logo">
        <Link href="/">
          <img
            src="/logo192.png"
            alt="Trendora Logo"
            className="logo-img"
          />
          {/* <span className="logo-text">Trendora</span> */}
        </Link>
        <span className="logo-text">Trendora</span>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Middle: Navigation Links */}
      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
      <div className="navbar-links">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
      </div>

      {/* Right: Auth Buttons */}
      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
      <div className="navbar-auth">
        {!user ? (
          <>
            <Link className="login-btn" href="/login">Login</Link>
            <Link className="register-btn" href="/register">Register</Link>
          </>
        ) : (
          <>
          <div className="pro-detail">
          <div className="pro-detail1">
            <Link className="wishlist-btn" href="/wishlist" title="Wishlist">
              <span role="img" aria-label="Wishlist">🤍</span>
            </Link>
            <Link id="cart-btn" href="/cart" title="Cart">
              <span role="img" aria-label="Cart">🛒</span>
            </Link>
            <Link className="profile-btn" href="/profile" title="Profile">
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