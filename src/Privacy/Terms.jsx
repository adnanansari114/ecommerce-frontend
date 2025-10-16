import React from "react";
import { Link } from "react-router-dom";
import "../styles/Privacy.css";

const Terms = () => (
  <div className="privacy-main">
    <div className="privacy-header">
      <h1>
        <span className="privacy-icon">📜</span> Terms & Conditions
      </h1>
      <p className="privacy-tagline">
        Please read our terms and conditions before using Trendora.
      </p>
    </div>
    <div className="privacy-nav-row">
      <Link to="/contact" className="privacy-nav-btn">Contact Us</Link>
      <Link to="/faq" className="privacy-nav-btn">FAQ</Link>
      <Link to="/return-refund" className="privacy-nav-btn">Return & Refund</Link>
      <Link to="/shipping-policy" className="privacy-nav-btn">Shipping Policy</Link>
      <Link to="/terms" className="privacy-nav-btn">Terms & Conditions</Link>
    </div>
    <div className="privacy-content">
      <section>
        <h2>Acceptance of Terms</h2>
        <p>By using Trendora, you agree to our terms, policies, and all applicable laws.</p>
      </section>
      <section>
        <h2>User Responsibilities</h2>
        <p>Provide accurate information, respect copyright, and use the site lawfully.</p>
      </section>
      <section>
        <h2>Intellectual Property</h2>
        <p>All content, logos, and trademarks are property of Trendora or its partners.</p>
      </section>
      <section>
        <h2>Limitation of Liability</h2>
        <p>We are not liable for indirect damages or losses from using our site.</p>
      </section>
      <section>
        <h2>Changes to Terms</h2>
        <p>We may update these terms at any time. Continued use means you accept the changes.</p>
      </section>
    </div>
    <footer className="privacy-footer">
      <p>
        <span className="privacy-footer-icon">📜</span> Thank you for choosing Trendora.
      </p>
    </footer>
  </div>
);

export default Terms;