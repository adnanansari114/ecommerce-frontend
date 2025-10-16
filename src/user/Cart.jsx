import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/User.css";
import API from "../utils/api";
import defaultImg from "../assets/default-avatar.png"; // Use a default image if product image not found

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [msg, setMsg] = useState("");
  const userToken = localStorage.getItem("token"); 
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);

  // Fetch cart from backend
  useEffect(() => {
  const fetchCart = async () => {
    try {
      const res = await API.get("/api/cart");
      setCart(res.data);
    } catch {
      setCart({ items: [] });
    }
  };
  if (userToken) fetchCart();
}, [userToken]);

  // Update quantity in cart (API)
  const handleQty = async (itemId, newQty) => {
  if (!cart || !cart.items) return;
  const item = cart.items.find((i) => i._id === itemId);
  if (!item) return;
  try {
    const res = await API.post("/api/cart", {
      productId: item.product._id,
      qty: newQty,
    });
    setCart(res.data);
  } catch {
    setMsg("Failed to update quantity.");
  }
  setTimeout(() => setMsg(""), 1200);
};

  // Remove item from cart (API)
  const handleRemove = async (itemId) => {
  try {
    const res = await API.delete(`/api/cart/${itemId}`);
    setCart(res.data);
  } catch {
    setMsg("Failed to remove item.");
  }
  setTimeout(() => setMsg(""), 1200);
};

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

  // Buy/Order Now
  const handleOrder = () => {
    navigate("/buy");
  };

  if (!cart) {
    return (
      <div className="cart-main">
        <div className="cart-card">Loading...</div>
      </div>
    );
  }

  return (
    <div className="cart-main">
      <div className="cart-card">
        <h2 className="cart-title">Your Cart</h2>
        {msg && <div className="cart-msg">{msg}</div>}
        {(!cart.items || cart.items.length === 0) ? (
          <div className="cart-empty">Your cart is empty.</div>
        ) : (
          <>
            <div className="cart-list">
              {cart.items.map((item) => (
                <div className="cart-item" key={item._id}>
                  <div className="cart-sec-one">
                  <img src={ item.product && item.product.images && item.product.images.length > 0 ? item.product.images[0] : defaultImg }
                    alt={item.product ? item.product.title : "Product"}
                    className="cart-item-img" onError={e => { e.target.src = defaultImg; }} />
                  <div className="cart-item-info">
                    <div className="cart-item-name">
                      {item.product ? item.product.title : "Product"}
                    </div>
                    </div>
                    <div className="cart-item-detail">
                      {item.product ? item.product.details : ""}
                    </div>
                  </div>
                  <div className="cart-sec-two">
                  <div className="cart-item-price">
                    ₹{item.product ? item.product.price : 0}
                  </div>
                  <div className="cart-item-qty">
                    <button onClick={() => item.qty > 1 && handleQty(item._id, item.qty - 1) } > - </button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleQty(item._id, item.qty + 1)}> + </button>
                  </div>
                  </div>
                  <div className="cart-sec-three">
                  <div className="cart-item-total"> ₹{item.product && item.product.price ? item.product.price * item.qty : 0} </div>
                  <button className="cart-remove-btn" onClick={() => handleRemove(item._id)} > ✖ </button>
                </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Total Amount:</span>
                <span className="cart-summary-total">₹{total}</span>
              </div>
              <button className="cart-order-btn" onClick={handleOrder}>
                Order Now
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;