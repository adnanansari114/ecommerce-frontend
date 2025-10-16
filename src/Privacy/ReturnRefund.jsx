import React from "react";
import { Link } from "react-router-dom";
import "../styles/Privacy.css";

const ReturnRefund = () => (
  <div className="privacy-main">
    <div className="privacy-header">
      <h1>
        <span className="privacy-icon">🔄</span> Return & Refund Policy
      </h1>
      <p className="privacy-tagline">
        Hassle-free returns and refunds for your peace of mind.
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
        <h2>Return Policy</h2>
        <p>Returns are accepted within 7 days of delivery. Items must be unused and in original packaging.</p>
      </section>
      <section>
        <h2>Refund Process</h2>
        <p>Once we receive your return, refunds are processed within 5-7 business days to your original payment method.</p>
      </section>
      <section>
        <h2>Non-Returnable Items</h2>
        <p>Some items (like perishable goods or personal care) are non-returnable. See product details for more info.</p>
      </section>
      <section>
        <h2>How to Request a Return</h2>
        <p>Contact us at <a href="mailto:support@trendora.com">support@trendora.com</a> with your order details.</p>
      </section>
    </div>
    <footer className="privacy-footer">
      <p>
        <span className="privacy-footer-icon">🔄</span> Trendora cares about your satisfaction.
      </p>
    </footer>
  </div>
);

export default ReturnRefund;