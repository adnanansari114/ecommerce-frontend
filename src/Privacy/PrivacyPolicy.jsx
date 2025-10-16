import React from "react";
import { Link } from "react-router-dom";
import "../styles/Privacy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-main">
      <div className="privacy-header">
        <h1>
          <span className="privacy-icon">🔐</span> Privacy Policy
        </h1>
        <p className="privacy-tagline">
          We value your privacy and are committed to protecting your personal information.
        </p>
      </div>

      {/* Navigation Row */}
      <div className="privacy-nav-row">
        <Link to="/contact" className="privacy-nav-btn">Contact Us</Link>
        <Link to="/faq" className="privacy-nav-btn">FAQ</Link>
        <Link to="/return-refund" className="privacy-nav-btn">Return & Refund</Link>
        <Link to="/shipping-policy" className="privacy-nav-btn">Shipping Policy</Link>
        <Link to="/terms" className="privacy-nav-btn">Terms & Conditions</Link>
      </div>
      
      <div className="privacy-content">
        <section>
          <h2>Introduction</h2>
          <p>
            At <b>Trendora</b>, your privacy is our top priority. This policy describes how we collect, use, and protect your information when you use our website and services.
          </p>
        </section>
        <section>
          <h2>Information We Collect</h2>
          <ul>
            <li><b>Personal Info:</b> Name, email, address, phone number, etc.</li>
            <li><b>Order Data:</b> Products purchased, payment details (securely processed), and delivery info.</li>
            <li><b>Usage Data:</b> IP address, browser type, device info, and site activity.</li>
          </ul>
        </section>
        <section>
          <h2>How We Use Your Data</h2>
          <ul>
            <li>To process orders and deliver products</li>
            <li>To improve your shopping experience</li>
            <li>To send updates, offers, and support</li>
            <li>To ensure security and prevent fraud</li>
          </ul>
        </section>
        <section>
          <h2>How We Protect Your Data</h2>
          <ul>
            <li>End-to-end encryption for sensitive data</li>
            <li>Secure payment gateways (Razorpay, Stripe, PayPal)</li>
            <li>Regular security audits and updates</li>
          </ul>
        </section>
        <section>
          <h2>Your Rights</h2>
          <ul>
            <li>Access, update, or delete your data anytime</li>
            <li>Opt-out of marketing emails</li>
            <li>Request a copy of your stored data</li>
          </ul>
        </section>
        <section>
          <h2>Cookies & Tracking</h2>
          <p>
            We use cookies to personalize your experience and analyze site traffic. You can manage cookie preferences in your browser settings.
          </p>
        </section>
        <section>
          <h2>Third-Party Services</h2>
          <p>
            We may share data with trusted partners (like payment processors and delivery services) only as needed to fulfill your orders. We never sell your data.
          </p>
        </section>
        <section>
          <h2>Policy Updates</h2>
          <p>
            We may update this policy to reflect changes in our practices. We’ll notify you of significant updates via email or on our website.
          </p>
        </section>
        <section>
          <h2>Contact Us</h2>
          <p>
            Have questions or concerns? <br />
            <span role="img" aria-label="Email">📧</span>{" "}
            <a href="mailto:support@trendora.com">support@trendora.com</a>
          </p>
        </section>
      </div>
      <footer className="privacy-footer">
        <p>
          <span className="privacy-footer-icon">🔒</span> Trendora respects your privacy.<br />
          <span className="privacy-footer-quote">"Your trust is our top priority."</span>
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;