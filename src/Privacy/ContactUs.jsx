import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import "../styles/Privacy.css";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    try {
      await API.post("/api/contact", form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send message.");
    }
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
            <input name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@email.com" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" required value={form.message} onChange={handleChange} placeholder="How can we help you?" rows={4} />
          </div>
          <button className="contact-btn" type="submit">Send Message</button>

          {error && <div className="contact-error">{error}</div>}
          {sent && <div className="contact-success">✅ Message sent! We'll get back to you soon.</div>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
