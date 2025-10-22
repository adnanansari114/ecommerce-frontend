import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Products.css";
import API from '../utils/api.jsx';

const AdminProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const [cartMsg, setCartMsg] = useState("");
  const [likeMsg, setLikeMsg] = useState("");
  const [liked, setLiked] = useState(false);
  const userToken = API.defaults.headers.common['Authorization']?.replace('Bearer ', '');

  useEffect(() => {
  API.get(`/api/product/${id}`)
    .then((res) => {
      setProduct(res.data);
      setMainImg(res.data.images?.[0] || "");
      setSelectedColor(res.data.colorOptions?.[0] || "");
      setSelectedSize(res.data.sizeOptions?.[0] || "");
    })
    .catch(() => setCartMsg("Failed to load product."));
}, [id]);

  if (!product) {
    return <div className="product-detail-main">Loading...</div>;
  }

  return (
    <> 
    <div className="product-detail-main">
      <div className="product-detail-container">
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
              <span className="product-detail-stock">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>
            <div>
              <b>SKU:</b> <span className="product-detail-sku">{product.sku}</span>
            </div>
          </div>
          <div className="product-detail-actions">
          </div>
          {cartMsg && <div className="cart-msg">{cartMsg}</div>}
          {likeMsg && <div className="like-msg">{likeMsg}</div>}
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminProduct;