import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Styles/User.css";
import defaultImg from "../assets/default-avatar.png";
import API from "../utils/api";

const Buy = () => {
  const [cart, setCart] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const { state } = useLocation();
  const productFromState = state?.product || null;

  // Redirect to login if not logged in  
  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);

  // Add product from ProductDetail if present, then fetch cart
  useEffect(() => {
  const addAndFetchCart = async () => {
    if (productFromState) {
      // Add to cart
      await API.post("/api/cart", {
        productId: productFromState._id,
        qty: productFromState.qty,
        color: productFromState.selectedColor,
        size: productFromState.selectedSize,
      });
    }
    // Now fetch cart
    try {
      const res = await API.get("/api/cart");
      setCart(res.data);
    } catch {
      setCart({ items: [] });
    }
    setLoading(false);
  };
  if (userToken) addAndFetchCart();
}, [userToken, productFromState]);

  // Calculate total
  const total =
    cart && cart.items
      ? cart.items.reduce(
          (sum, item) =>
            sum +
            (item.product && item.product.price
              ? item.product.price * item.qty
              : 0),
          0
        )
      : 0;

  // Confirm buy/order
  const handleConfirmBuy = async () => {
  try {
    const res = await API.post("/api/orders", {
      items: cart.items.map((item) => ({
        productId: item.product._id,
        qty: item.qty,
        color: item.color,
        size: item.size,
      })),
    });
    setMsg("Order placed successfully!");
    setTimeout(() => {
      navigate("/order-confirmation", {
        state: { order: res.data.order }
      });
    }, 1200);
  } catch {
    setMsg("Failed to place order.");
  }
  setTimeout(() => setMsg(""), 1200);
};

  if (loading) {
    return (
      <div className="buy-main">
        <div className="buy-card">Loading...</div>
      </div>
    );
  }

  return (
    <div className="buy-main">
      <div className="buy-card">
        <h2 className="buy-title">Confirm Your Order</h2>
        {msg && <div className="buy-msg">{msg}</div>}
        {(!cart.items || cart.items.length === 0) ? (
          <div className="buy-empty">No products to buy.</div>
        ) : (
          <>
            <div className="buy-list">
              {cart.items.map((item) => (
                <div className="buy-item" key={item._id}>
                  <img
                    src={
                      item.product && item.product.images && item.product.images.length > 0
                        ? item.product.images[0]
                        : defaultImg
                    }
                    alt={item.product ? item.product.title : "Product"}
                    className="buy-item-img"
                    onError={e => { e.target.src = defaultImg; }}
                  />
                  <div className="buy-item-info">
                    <div className="buy-item-name">
                      {item.product ? item.product.title : "Product"}
                    </div>
                    <div className="buy-item-detail">
                      {item.product ? item.product.details : ""}
                    </div>
                  </div>
                  <div className="buy-sec">
                  <div className="buy-item-price">
                    ₹{item.product ? item.product.price : 0}
                  </div>
                  <div className="buy-item-qty">
                    Qty: {item.qty}
                  </div>
                  </div>
                  <div className="buy-item-total">
                    ₹
                    {item.product && item.product.price
                      ? item.product.price * item.qty
                      : 0}
                  </div>
                </div>
              ))}
            </div>
            <div className="buy-summary">
              <div className="buy-summary-row">
                <span>Total Amount:</span>
                <span className="buy-summary-total">₹{total}</span>
              </div>
              <button className="buy-confirm-btn" onClick={handleConfirmBuy}>
                Confirm & Buy
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Buy;