import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Footer = () => (
  <footer className="main-footer">
    <div className="footer-container">
      <div className="footer-section">
        <h4>Pages</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Connect</h4>
        <div className="footer-socials">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <span className="footer-icon">📸</span>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <span className="footer-icon">📘</span>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <span className="footer-icon">🐦</span>
          </a>
          <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <span className="footer-icon">💬</span>
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h4>Policies</h4>
        <ul>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          <li><Link to="/return-refund">Return & Refund</Link></li>
          <li><Link to="/shipping-policy">Shipping Policy</Link></li>
          <li><Link to="/terms">Terms & Conditions</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Made By</h4>
        <p>
          <span role="img" aria-label="rocket">🚀</span> Trendora Team<br />
          <span className="footer-quote">"Trends change, but trust stays forever."</span>
        </p>
      </div>
    </div>
    <div className="footer-bottom">
      &copy; {new Date().getFullYear()} Trendora. All rights reserved.
    </div>
  </footer>
);

export default Footer;