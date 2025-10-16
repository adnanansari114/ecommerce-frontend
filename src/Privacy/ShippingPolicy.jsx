import React from "react";
import { Link } from "react-router-dom";
import "../styles/Privacy.css";

const ShippingPolicy = () => (
  <div className="privacy-main">
    <div className="privacy-header">
      <h1>
        <span className="privacy-icon">🚚</span> Shipping Policy
      </h1>
      <p className="privacy-tagline">
        Fast, reliable, and trackable shipping for every order.
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
        <h2>Shipping Time</h2>
        <p>Orders are processed within 1-2 business days. Delivery usually takes 4-7 business days depending on your location.</p>
      </section>
      <section>
        <h2>Shipping Charges</h2>
        <p>Free shipping on orders above ₹999. For orders below, a nominal shipping fee applies.</p>
      </section>
      <section>
        <h2>Order Tracking</h2>
        <p>Once shipped, you will receive a tracking link via email/SMS.</p>
      </section>
      <section>
        <h2>International Shipping</h2>
        <p>Currently, we ship only within India.</p>
      </section>
    </div>
    <footer className="privacy-footer">
      <p>
        <span className="privacy-footer-icon">🚚</span> Trendora delivers with care.
      </p>
    </footer>
  </div>
);

export default ShippingPolicy;