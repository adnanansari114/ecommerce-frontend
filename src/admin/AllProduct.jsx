import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Products.css";
import API from "../utils/api";

// Example: isAdmin should come from your auth context or props
const isAdmin = true; // Replace with real admin check

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [cartMsg, setCartMsg] = useState("");
  const [likeMsg, setLikeMsg] = useState("");
  const navigate = useNavigate();

  // Fetch products from backend API
  // Fetch products from backend API
useEffect(() => {
  API.get("/api/product")
    .then((res) => setProducts(res.data))
    .catch(() => setCartMsg("Failed to load products."));
}, []);

  // Show detail navigation
  const handleShowDetail = (productId) => {
    navigate(`/adminproduct/${productId}`);
  };

  // Edit product navigation (admin only)
  const handleEdit = (productId) => {
    if (isAdmin) {
      navigate(`/admin/edit-product/${productId}`);
    }
  };

  // Delete product (admin only)
const handleDelete = async (productId) => {
  if (!isAdmin) return;
  if (!window.confirm("Are you sure you want to delete this product?")) return;
  try {
    await API.delete(`/api/product/${productId}`);
    setProducts(products.filter((p) => p._id !== productId));
    setCartMsg("Product deleted successfully.");
  } catch {
    setCartMsg("Server error while deleting.");
  }
};

  return (
    <>
    <div className="container all-products-section">
      <h2 className="trending-title">All Products</h2>
      {cartMsg && <div className="cart-msg">{cartMsg}</div>}
      {likeMsg && <div className="like-msg">{likeMsg}</div>}
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
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
            <div className="product-actions" id="view-detail-btn">
              <button
                className="detail-btn" 
                onClick={() => handleShowDetail(product._id)}
              >
                Show Detail
              </button>
              {isAdmin && (
                <>
                  <button
                    className="detail-btn edit-btn"
                    onClick={() => handleEdit(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="detail-btn delete-btn"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default AllProducts;