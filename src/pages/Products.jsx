import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Products.css";
import API from "../utils/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState([]);
  const [cartMsg, setCartMsg] = useState("");
  const [likeMsg, setLikeMsg] = useState("");
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/product");
        setProducts(res.data);
        setLiked(Array(res.data.length).fill(false));
      } catch {
        setCartMsg("Failed to load products.");
      }
    };
    fetchProducts();
  }, []);

  // Add to wishlist
  const handleLike = async (index, productId) => {
  if (!userToken) {
    setLikeMsg("Please login to add to wishlist.");
    setTimeout(() => setLikeMsg(""), 1500);
    return;
  }
  const method = liked[index] ? "DELETE" : "POST";
  const url = method === "POST" ? "/api/wishlist" : `/api/wishlist/${productId}`;
  
  try {
    await API[method.toLowerCase()](url, method === "POST" ? { productId } : {});
    setLiked((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
    setLikeMsg(!liked[index] ? "Added to wishlist!" : "Removed from wishlist.");
  } catch {
    setLikeMsg("Error updating wishlist.");
  }
  setTimeout(() => setLikeMsg(""), 1500);
};

  // Add to cart
  const handleAddToCart = async (productId) => {
  if (!userToken) {
    setCartMsg("Please login to add to cart.");
    setTimeout(() => setCartMsg(""), 1500);
    return;
  }
  try {
    await API.post("/api/cart", { productId, qty: 1 });
    const prod = products.find(p => p._id === productId);
    setPopupProduct(prod);
    setShowCartPopup(true);
    navigate("/cart");
  } catch {
    setCartMsg("Error adding to cart.");
  }
  setTimeout(() => setCartMsg(""), 1500);
};

  // Show detail navigation
  const handleShowDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="container all-products-section">
      <h2 className="trending-title">All Products</h2>
      {cartMsg && <div className="cart-msg">{cartMsg}</div>}
      {likeMsg && <div className="like-msg">{likeMsg}</div>}
      <div className="products-grid">
        {products.map((product, idx) => (
          <div className="product-cards" key={product._id}>
            <div className="product-img-wrap">
              <img
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "/images/product1.jpg"
                }
                alt={product.title}
                className="product-img"
              />
            </div>
            <div className="product-title">{product.title}</div>
            <div className="product-price-row">
              <span className="product-price">₹{product.price}</span>
              <span className="product-mrp">₹{product.mrp}</span>
            </div>
            <div className="product-desc">{product.description}</div>
            <div className="product-actions">
              <button
                className="detail-btn"
                onClick={() => handleShowDetail(product._id)}
              >
                Show Detail
              </button>
              <button
                className="cart-btn"
                onClick={() => handleAddToCart(product._id)}
                disabled={!userToken}
                title={!userToken ? "Login to add to cart" : ""}
              >
                Add to Cart
              </button>
              <button
                className={`like-btn${liked[idx] ? " liked" : ""}`}
                onClick={() => handleLike(idx, product._id)}
                aria-label="Like"
                disabled={!userToken}
                title={!userToken ? "Login to add to wishlist" : ""}
              >
                ♥
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Popup Modal */}
      {showCartPopup && popupProduct && (
        <div className="cart-popup-overlay">
          <div className="cart-popup">
            <div className="cart-popup-msg">
              <b>{popupProduct.title}</b> added to cart!
            </div>
            <button
              className="cart-popup-ok"
              onClick={() => setShowCartPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;