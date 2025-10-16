import React from "react";
import "../styles/Navbar.css";

const Loader = ({
  message = "Preparing your experience...",
  type = "spinner", // spinner | dots | bar | skeleton
}) => (
  <div className="loader-main">
    <div className="loader-box">
      {type === "spinner" && (
        <div className="loader-spinner"></div>
      )}
      {type === "dots" && (
        <div className="loader-dots">
          <span></span><span></span><span></span>
        </div>
      )}
      {type === "bar" && (
        <div className="loader-bar">
          <div className="loader-bar-inner"></div>
        </div>
      )}
      {type === "skeleton" && (
        <div className="loader-skeleton">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-lines">
            <div className="skeleton-line"></div>
            <div className="skeleton-line short"></div>
            <div className="skeleton-line"></div>
          </div>
        </div>
      )}
      <div className="loader-message">{message}</div>
    </div>
  </div>
);

export default Loader;