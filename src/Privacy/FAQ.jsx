import React from "react";
import { Link } from "react-router-dom";
import "../styles/Privacy.css";

const FAQ = () => (
  <div className="privacy-main">
    <div className="privacy-header">
      <h1>
        <span className="privacy-icon">❓</span> FAQ
      </h1>
      <p className="privacy-tagline">
        Frequently Asked Questions about Trendora.
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
        <h2>How do I place an order?</h2>
        <p>Browse products, add to cart, and proceed to checkout. Follow the instructions to complete your purchase.</p>
      </section>
      <section>
        <h2>How can I track my order?</h2>
        <p>You will receive a tracking link via email once your order is shipped.</p>
      </section>
      <section>
        <h2>Can I cancel or change my order?</h2>
        <p>Contact us as soon as possible. If your order hasn't shipped, we can help you modify or cancel it.</p>
      </section>
      <section>
        <h2>How do I contact support?</h2>
        <p>Email us at <a href="mailto:support@trendora.com">support@trendora.com</a> or use our <Link to="/contact">Contact Us</Link> page.</p>
      </section>
    </div>
    <footer className="privacy-footer">
      <p>
        <span className="privacy-footer-icon">❓</span> Still have questions? Contact us anytime!
      </p>
    </footer>
  </div>
);

export default FAQ;