import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Add Link
import { FilterContext } from "../context/FilterContext.jsx";
import "../styles/Products.css";
import API from "../utils/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState([]);
  const [cartMsg, setCartMsg] = useState("");
  const [likeMsg, setLikeMsg] = useState("");
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [popupProduct, setPopupProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Add for filters
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const { filters } = useContext(FilterContext); // Add for filters

  // Fetch products with filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          ...(filters.category && { category: filters.category }),
          ...(filters.minPrice && { minPrice: filters.minPrice }),
          ...(filters.maxPrice && { maxPrice: filters.maxPrice }),
          ...(filters.color && { color: filters.color }),
          ...(filters.minRating && { minRating: filters.minRating }),
          ...(filters.search && { search: filters.search }),
        }).toString();

        const res = await API.get(`/api/product${params ? `?${params}` : ''}`);
        setProducts(res.data || []); // Fallback to empty array
        setLiked(Array(res.data?.length || 0).fill(false)); // Initialize liked
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setCartMsg("Failed to load products.");
        setProducts([]);
        setLiked([]);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [filters]); // Depend on filters for re-fetch

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
      setLikeMsg(liked[index] ? "Removed from wishlist." : "Added to wishlist!");
    } catch (err) {
      console.error("Error updating wishlist:", err);
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
      const prod = products.find((p) => p._id === productId);
      setPopupProduct(prod);
      setShowCartPopup(true);
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
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
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products match the filters.</p>
      ) : (
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
              {/* Add extra details from new version */}
              <div className="product-details">
                <p>Category: {product.category}</p>
                <p>Colors: {product.colorOptions?.join(', ') || 'N/A'}</p>
                <p>Rating: {product.rating} ★</p>
              </div>
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
      )}

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