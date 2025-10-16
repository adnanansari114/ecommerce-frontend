import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Pages.css";
import API from '../utils/api.jsx';
const images = [
  "../images/cover1.jpg",
  "../images/cover4.jpg",
  "../images/cover2.jpg",
  "../images/gallery2.jpg",
];
const userToken = localStorage.getItem("token");

// Animated Counter Component
const AnimatedCounter = ({ from, to, duration = 2000 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let start = from;
    const increment = (to - from) / (duration / 20);
    const interval = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= to) || (increment < 0 && start <= to)) {
        setCount(to);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);
    return () => clearInterval(interval);
  }, [from, to, duration]);

  return <span>{count}+</span>;
};

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState([]);
  const [trending, setTrending] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const navigate = useNavigate();
  // const userToken = localStorage.getItem("token");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch products from backend API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/api/product");
        // const data = await res.json();
        setProducts(res.data);
        setLiked(Array(res. data.length).fill(false));
        setTrending(res.data.slice(0, 3));
        setRandomProducts(shuffleArray(res.data).slice(0, 6));
      } catch {
        setProducts([]);
        setTrending([]);
        setRandomProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const handleMoreClick = () => {
    navigate("/products");
  };

  const handleShowDetail = (productId) => {
    navigate(`/products/${productId}`);
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

  return (
    <>
      <div className="home-cover">
        <div
          className="cover-image"
          style={{ backgroundImage: `url(${images[current]})` }}
        >
          <div className="cover-content">
            <h1>Welcome to Trendora</h1>
            <p>
              Discover trending products from the best suppliers. Shop the latest trends with ease and confidence!
            </p>
            <a href="/products" className="cover-btn">Shop Now</a>
          </div>
        </div>
      </div>

      {/* Trending Products Section */}
      <div className="container trending-section">
        <h2 className="trending-title">Trending Products of the Week</h2>
        <div className="trending-cards">
          {trending.map((product, idx) => (
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
      </div>

      {/* Animated Stats Cover Section */}
      <div className="stats-cover">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon customers">
              <span role="img" aria-label="Customers">👥</span>
            </div>
            <div className="stat-count">
              <AnimatedCounter from={1} to={100} duration={2000} />
            </div>
            <div className="stat-label">Customers</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon products">
              <span role="img" aria-label="Products Sold">🛒</span>
            </div>
            <div className="stat-count">
              <AnimatedCounter from={1} to={500} duration={2000} />
            </div>
            <div className="stat-label">Products Sold</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon delivery">
              <span role="img" aria-label="Fast Delivery">🚚</span>
            </div>
            <div className="stat-count">
              <AnimatedCounter from={1} to={50} duration={2000} />
            </div>
            <div className="stat-label">Fast Deliveries</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon rating">
              <span role="img" aria-label="5 Star Reviews">⭐</span>
            </div>
            <div className="stat-count">
              <AnimatedCounter from={1} to={200} duration={2000} />
            </div>
            <div className="stat-label">5 Star Reviews</div>
          </div>
        </div>
      </div>

      {/* All Products Random Scrollable Section */}
      <div className="container all-products-section">
        <h2 className="trending-title">All Products</h2>
        <div className="all-products-scroll">
          {randomProducts.map((product, idx) => (
            <div className="product-card" key={product._id}>
              <div className="product-img-wrap">
                <img src={product.images?.[0] || "/images/product1.jpg"} alt={product.title} className="product-img" />
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
        <div className="more-btn-wrap">
          <button className="more-btn" onClick={handleMoreClick}>
            More Products
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;