import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Admin.css";

const OrderConfirmation = () => {
  const { state } = useLocation();
  const order = state?.order;

  const navigate = useNavigate();

  const handleTrackOrder = () => {
    navigate(`/track-order/${order._id || order.id}`);
  };

  if (!order) {
    return (
      <div className="order-confirm-main">
        <div className="order-confirm-box">
          <h2>No order found!</h2>
          <Link to="/products" className="order-confirm-btn">Go to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="order-confirm-main">
        <div className="order-confirm-box">
          <div className="order-confirm-header">
            <span className="order-confirm-icon">✅</span>
            <h1>Thank You for Your Order!</h1>
            <p>Your order has been placed successfully.</p>
          </div>
          <div className="order-confirm-details">
            <div className="order-confirm-row">
              <span>Order ID:</span>
              <b>{order._id || order.id}</b>
            </div>
            <div className="order-confirm-row">
              <span>Order Date:</span>
              <b>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date}</b>
            </div>
            <div className="order-confirm-row">
              <span>Customer:</span>
              <b>{order.user?.name || order.name}</b>
            </div>
            <div className="order-confirm-row">
              <span>Email:</span>
              <b>{order.user?.email || order.email}</b>
            </div>
            <div className="order-confirm-row">
              <span>Shipping Address:</span>
              <b>
                {order.shippingAddress
                  ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state}, ${order.shippingAddress.zip}, ${order.shippingAddress.country}`
                  : order.address}
              </b>
            </div>
            <div className="order-confirm-row">
              <span>Payment Method:</span>
              <b>{order.paymentMethod || order.payment}</b>
            </div>
            <div className="order-confirm-row">
              <span>Shipping Method:</span>
              <b>{order.deliveryMethod || order.delivery}</b>
            </div>
          </div>
          <div className="order-confirm-items">
            <h2>Order Summary</h2>
            {(order.items || []).map((item, idx) => (
              <div className="order-confirm-item" key={idx}>
                <img
                  src={
                    item.product?.images?.[0] ||
                    item.image ||
                    "/images/product1.jpg"
                  }
                  alt={item.product?.title || item.name}
                />
                <div>
                  <div className="order-confirm-item-name">
                    {item.product?.title || item.name}
                  </div>
                  <div className="order-confirm-item-qty">
                    Qty: {item.qty} × ₹{item.product?.price || item.price}
                  </div>
                </div>
                <div className="order-confirm-item-total">
                  ₹
                  {(item.product?.price || item.price) * item.qty}
                </div>
              </div>
            ))}
            <div className="order-confirm-breakdown">
              <div>
                <span>Subtotal</span>
                <span>₹{order.subtotal || order.items?.reduce((sum, i) => sum + (i.product?.price || i.price) * i.qty, 0)}</span>
              </div>
              <div>
                <span>Shipping</span>
                <span>
                  {order.shipping === 0 || order.shipping === "0" || order.shipping === undefined
                    ? "Free"
                    : `₹${order.shipping}`}
                </span>
              </div>
              <div>
                <span>Tax</span>
                <span>₹{order.tax || 0}</span>
              </div>
              <div>
                <span>Discount</span>
                <span>-₹{order.discount || 0}</span>
              </div>
              <div className="order-confirm-grand">
                <span>Grand Total</span>
                <span>₹{order.grandTotal || order.total || order.subtotal}</span>
              </div>
            </div>
          </div>
          <div className="order-track-btn">
            <button onClick={handleTrackOrder}>Track Your Order</button>
          </div>
          <div className="order-confirm-footer">
            <div>
              <b>Need help?</b>{" "}
              <a href="mailto:support@trendora.com">Contact Support</a>
            </div>
            <div>
              <Link to="/products" className="order-confirm-btn">
                Continue Shopping
              </Link>
              <Link to="/" className="order-confirm-btn">
                Go to Home
              </Link>
            </div>
            <div className="order-confirm-policy">
              <Link to="/privacy-policy">Privacy Policy</Link> |{" "}
              <Link to="/terms">Terms</Link> |{" "}
              <Link to="/return-refund">Return Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmation;