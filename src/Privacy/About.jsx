import React from "react";
import "../styles/Privacy.css";

const About = () => {
  return (
    <div className="about-main">
      <div className="about-hero">
        <div className="about-hero-bg"></div>
        <div className="about-hero-content">
          <h1 className="about-title">About <span>Trendora</span></h1>
          <p className="about-subtitle">
            Your gateway to trending products, seamless shopping, and trusted suppliers.
          </p>
        </div>
      </div>
      <div className="about-content">
        <div className="about-card about-card-left animate-fade-in">
          <h2>Who We Are</h2>
          <p>
            <b>Trendora</b> is a modern dropshipping platform dedicated to bringing you the latest and most popular products from trusted suppliers like <b>xyz</b>. We believe in making online shopping easy, fun, and reliable for everyone.
          </p>
        </div>
        <div className="about-card about-card-right animate-slide-in">
          <h2>Our Mission</h2>
          <p>
            To empower customers with access to trending products at the best prices, while supporting suppliers and entrepreneurs to grow their businesses globally.
          </p>
        </div>
        <div className="about-card about-card-center animate-pop-in">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>🚀 Fast & Reliable Delivery</li>
            <li>💡 Curated Trending Products</li>
            <li>🔒 Secure Payments & Data</li>
            <li>🤝 24/7 Customer Support</li>
            <li>🌟 1000+ Happy Customers</li>
          </ul>
        </div>
      </div>
      <div className="about-team-section">
        <h2 className="about-team-title">Meet Our Creative Team</h2>
        <div className="about-team-list">
          <div className="about-team-card animate-bounce">
            <img src="/images/team1.png" alt="Adnan Ansari" />
            <h3>Adnan Ansari</h3>
            <p>Founder & Developer</p>
          </div>
          <div className="about-team-card animate-bounce" style={{ animationDelay: "0.2s" }}>
            <img src="/images/team2.png" alt="Priya Sharma" />
            <h3>Priya Sharma</h3>
            <p>Marketing Lead</p>
          </div>
          <div className="about-team-card animate-bounce" style={{ animationDelay: "0.4s" }}>
            <img src="/images/team3.png" alt="Rahul Verma" />
            <h3>Rahul Verma</h3>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </div>
      <div className="about-footer">
        <p>
          Made with <span className="about-heart">♥</span> by the Trendora Team. <br />
          <span className="about-quote">"Trends change, but trust stays forever."</span>
        </p>
      </div>
    </div>
  );
};

export default About;