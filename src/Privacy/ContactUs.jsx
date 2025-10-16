import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Privacy.css";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-main">
      <div className="contact-hero">
        <div className="contact-hero-bg"></div>
        <div className="contact-hero-content">
          <h1 className="contact-title">Contact <span>Trendora</span></h1>
          <p className="contact-subtitle">
            We'd love to hear from you! Reach out for support, feedback, or partnership.
          </p>
        </div>
      </div>

      <div className="privacy-nav-row">
            <Link to="/contact" className="privacy-nav-btn">Contact Us</Link>
            <Link to="/faq" className="privacy-nav-btn">FAQ</Link>
            <Link to="/return-refund" className="privacy-nav-btn">Return & Refund</Link>
            <Link to="/shipping-policy" className="privacy-nav-btn">Shipping Policy</Link>
            <Link to="/terms" className="privacy-nav-btn">Terms & Conditions</Link>
          </div>

      <div className="contact-content">
        <form className="contact-form animate-pop-in" onSubmit={handleSubmit}>
          <h2>Send Us a Message</h2>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={4}
            />
          </div>
          <button className="contact-btn" type="submit">
            Send Message
          </button>
          {sent && (
            <div className="contact-success animate-fade-in">
              <span role="img" aria-label="Success">✅</span> Message sent! We'll get back to you soon.
            </div>
          )}
        </form>
        <div className="contact-info animate-slide-in">
          <h2>Contact Details</h2>
          <ul>
            <li>
              <span role="img" aria-label="Email">📧</span> support@trendora.com
            </li>
            <li>
              <span role="img" aria-label="Phone">📞</span> +91 98765 43210
            </li>
            <li>
              <span role="img" aria-label="Location">📍</span> Mumbai, India
            </li>
            <li>
              <span role="img" aria-label="Clock">⏰</span> Mon-Sat: 9am - 8pm
            </li>
          </ul>
          <div className="contact-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon insta">📸</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon fb">📘</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon tw">🐦</a>
          </div>
        </div>
      </div>
      <div className="contact-footer">
        <span className="contact-heart">♥</span> Thank you for connecting with Trendora!
      </div>
    </div>
  );
};

export default ContactUs;