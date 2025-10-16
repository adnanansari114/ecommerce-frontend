import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Products.css";
import API from "../utils/api";

const ProductDetail = () => {
  const { id } = useParams(); // product id from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [cartMsg, setCartMsg] = useState("");
  const [likeMsg, setLikeMsg] = useState("");
  const [liked, setLiked] = useState(false);
  const userToken = localStorage.getItem("token");

  // Fetch product from backend API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/api/product/${id}`);
        setProduct(res.data);
        setMainImg(res.data.images && res.data.images.length > 0 ? res.data.images[0] : "");
        setSelectedColor(res.data.colorOptions && res.data.colorOptions.length > 0 ? res.data.colorOptions[0] : "");
        setSelectedSize(res.data.sizeOptions && res.data.sizeOptions.length > 0 ? res.data.sizeOptions[0] : "");
      } catch {
        setCartMsg("Failed to load product.");
      }
    };
    fetchProduct();
  }, [id]);

  // Add to cart with quantity, color, size
  const handleAddToCart = async () => {
  if (!userToken) {
    setCartMsg("Please login to add to cart.");
    setTimeout(() => setCartMsg(""), 1500);
    return;
  }
  try {
    await API.post("/api/cart", {
      productId: product._id,
      qty,
      color: selectedColor,
      size: selectedSize,
    });
    setCartMsg("Added to cart!");
  } catch {
    setCartMsg("Error adding to cart.");
  }
  setTimeout(() => setCartMsg(""), 1500);
};

// Buy now
const handleBuyNow = () => {
  if (!userToken) {
    setCartMsg("Please login to buy.");
    setTimeout(() => setCartMsg(""), 1500);
    return;
  }
  navigate("/buy", {
    state: {
      product: {
        ...product,
        selectedColor,
        selectedSize,
        qty,
        totalPrice: product.price * qty,
      },
    },
  });
};
  // Add to wishlist
  const handleLike = async () => {
  if (!userToken) {
    setLikeMsg("Please login to add to wishlist.");
    setTimeout(() => setLikeMsg(""), 1500);
    return;
  }
  const method = liked ? "DELETE" : "POST";
  const url = method === "POST" ? "/api/wishlist" : `/api/wishlist/${product._id}`;
  
  try {
    await API[method.toLowerCase()](url, method === "POST" ? { productId: product._id } : {});
    setLiked(!liked);
    setLikeMsg(!liked ? "Added to wishlist!" : "Removed from wishlist.");
  } catch {
    setLikeMsg("Error updating wishlist.");
  }
  setTimeout(() => setLikeMsg(""), 1500);
};

  if (!product) {
    return <div className="product-detail-main">Loading...</div>;
  }

  return (
    <div className="product-detail-main">
      <div className="product-detail-container">
        {/* Left: Images */}
        <div className="product-detail-images">
          <div className="product-main-img-wrap">
            <img src={mainImg} alt="Main" className="product-main-img" />
          </div>
          <div className="product-thumb-scroll">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className={`product-thumb-img${mainImg === img ? " active" : ""}`}
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
        </div>
        {/* Right: Details */}
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-brand">Brand: <b>{product.brand}</b></div>
          <div className="product-detail-rating">
            <span className="star">⭐</span> {product.rating} ({product.reviews} reviews)
          </div>
          <div className="product-detail-price-row">
            <span className="product-detail-price">₹{product.price}</span>
            <span className="product-detail-mrp">₹{product.mrp}</span>
            <span className="product-detail-off">
              {product.mrp && product.price
                ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
                : 0
              }% OFF
            </span>
          </div>
          <div className="product-detail-desc">{product.description}</div>
          <div className="product-detail-more">
            <b>Details:</b> {product.details}
          </div>
          <div className="product-detail-row">
            <div>
              <b>Color:</b>
              <div className="product-color-options">
                {product.colorOptions.map((color) => (
                  <button
                    key={color}
                    className={`color-btn${selectedColor === color ? " selected" : ""}`}
                    style={{
                      background:
                        color === "Black"
                          ? "#222"
                          : color === "Blue"
                          ? "#007bff"
                          : color === "Red"
                          ? "#e63946"
                          : "#eee",
                    }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <b>Size:</b>
              <select
                className="product-size-select"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {product.sizeOptions.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="product-detail-row">
            <div>
              <b>Quantity:</b>
              <input
                type="number"
                min={1}
                max={product.stock}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="product-qty-input"
              />
              <span className="product-detail-stock">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>
            <div>
              <b>SKU:</b> <span className="product-detail-sku">{product.sku}</span>
            </div>
          </div>
          <div className="product-detail-actions">
            <button
              className="detail-cart-btn"
              disabled={product.stock === 0}
              onClick={handleAddToCart}
              title={!userToken ? "Login to add to cart" : ""}
            >
              Add to Cart
            </button>
            <button
              className="detail-buy-btn"
              disabled={product.stock === 0}
              onClick={handleBuyNow}
              title={!userToken ? "Login to buy" : ""}
            >
              Buy Now
            </button>
            <button
              className={`like-btn${liked ? " liked" : ""}`}
              onClick={handleLike}
              aria-label="Like"
              disabled={!userToken}
              title={!userToken ? "Login to add to wishlist" : ""}
              style={{ marginLeft: "10px" }}
            >
              ♥
            </button>
          </div>
          {cartMsg && <div className="cart-msg">{cartMsg}</div>}
          {likeMsg && <div className="like-msg">{likeMsg}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;