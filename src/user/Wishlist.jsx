import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/User.css";
import defaultImg from "../assets/default-avatar.png";
import API from "../utils/api";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [msg, setMsg] = useState("");
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await API.get("/api/wishlist");
        setWishlist(res.data.items || []);
      } catch {
        setWishlist([]);
      }
    };
    if (userToken) fetchWishlist();
  }, [userToken]);

  const handleRemove = async (productId) => {
    try {
      await API.delete(`/api/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      setMsg("Removed from wishlist.");
    } catch {
      setMsg("Failed to remove.");
    }
    setTimeout(() => setMsg(""), 1200);
  };

  const handleAddToCart = async (productId, inStock) => {
    if (!inStock) return;
    try {
      await API.post("/api/cart", { productId, qty: 1 });
      setMsg("Added to cart!");
      handleRemove(productId);
      navigate("/cart");
    } catch {
      setMsg("Failed to add to cart.");
    }
    setTimeout(() => setMsg(""), 1200);
  };

  return (
    <div className="wishlist-main">
      <div className="wishlist-card">
        <h2 className="wishlist-title">My Wishlist</h2>
        {msg && <div className="wishlist-msg">{msg}</div>}
        {wishlist.length === 0 ? (
          <div className="wishlist-empty">Your wishlist is empty.</div>
        ) : (
          <div className="wishlist-list">
            {wishlist.map((item) => (
              <div className="wishlist-item" key={item._id}>
                <img
                  src={item.images && item.images.length > 0 ? item.images[0] : defaultImg}
                  alt={item.title}
                  className="wishlist-item-img"
                  onError={e => { e.target.src = defaultImg; }}
                />
                <div className="wishlist-item-info">
                  <div className="wishlist-item-name">{item.title}</div>
                  <div className="wishlist-item-detail">{item.details}</div>
                  <div className="wishlist-item-price">₹{item.price}</div>
                  <div className={`wishlist-item-stock ${item.stock > 0 ? "instock" : "outstock"}`}>
                    {item.stock > 0 ? "In Stock" : "Out of Stock"}
                  </div>
                </div>
                <div className="wishlist-item-actions">
                  <button
                    className="wishlist-add-btn"
                    onClick={() => handleAddToCart(item._id, item.stock > 0)}
                    disabled={item.stock <= 0}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="wishlist-remove-btn"
                    onClick={() => handleRemove(item._id)}
                  >
                    ✖
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;