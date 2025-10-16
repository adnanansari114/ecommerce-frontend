// import React from "react";
// import "../styles/Navbar.css";

// const Navbar = () => {
//   const user = localStorage.getItem("token");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   return (
//     <nav className="custom-navbar">
//       {/* Left: Logo */} 
//       <div className="navbar-logo">
//         <a href="/">
//           <img
//             src="/logo192.png"
//             alt="Trendora Logo"
//             className="logo-img"
//           />
//           {/* <span className="logo-text">Trendora</span> */}
//         </a>
//         <span className="logo-text">Trendora</span>
//       </div>

//       {/* Middle: Navigation Links */}
//       <div className="navbar-links">
//         <a href="/">Home</a>
//         <a href="/about">About</a>
//         <a href="/products">Products</a>
//         <a href="/contact">Contact</a>
//         <a href="/privacy-policy">Privacy Policy</a>
//       </div>

//       {/* Right: Auth Buttons */}
//       <div className="navbar-auth">
//         {!user ? (
//           <>
//             <a className="login-btn" href="/login">Login</a>
//             <a className="register-btn" href="/register">Register</a>
//           </>
//         ) : (
//           <>
//           <div className="pro-detail">
//           <div className="pro-detail1">
//             <a className="wishlist-btn" href="/wishlist" title="Wishlist">
//               <span role="img" aria-label="Wishlist">🤍</span>
//             </a>
//             <a id="cart-btn" href="/cart" title="Cart">
//               <span role="img" aria-label="Cart">🛒</span>
//             </a>
//             <a className="profile-btn" href="/profile" title="Profile">
//               <span role="img" aria-label="Profile">👤</span>
//             </a>
//             </div>
//             <button className="logout-btn" onClick={handleLogout}>Logout</button>
//             </div>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);  
  const user = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="custom-navbar">
      {/* Left: Logo */} 
      <div className="navbar-logo">
        <a href="/">
          <img
            src="/logo192.png"
            alt="Trendora Logo"
            className="logo-img"
          />
          {/* <span className="logo-text">Trendora</span> */}
        </a>
        <span className="logo-text">Trendora</span>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Middle: Navigation Links */}
      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/products">Products</a>
        <a href="/contact">Contact</a>
        <a href="/privacy-policy">Privacy Policy</a>
      </div>
      </div>

      {/* Right: Auth Buttons */}
      <div className={`navbar-menu ${menuOpen ? "active" : ""}`}>
      <div className="navbar-auth">
        {!user ? (
          <>
            <a className="login-btn" href="/login">Login</a>
            <a className="register-btn" href="/register">Register</a>
          </>
        ) : (
          <>
          <div className="pro-detail">
          <div className="pro-detail1">
            <a className="wishlist-btn" href="/wishlist" title="Wishlist">
              <span role="img" aria-label="Wishlist">🤍</span>
            </a>
            <a id="cart-btn" href="/cart" title="Cart">
              <span role="img" aria-label="Cart">🛒</span>
            </a>
            <a className="profile-btn" href="/profile" title="Profile">
              <span role="img" aria-label="Profile">👤</span>
            </a>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;