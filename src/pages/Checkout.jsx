import React, { useState } from "react";
import "../styles/Pages.css";
import { Link } from "react-router-dom";

// Dummy cart data for demonstration
const cartItems = [
  {
    id: 1,
    name: "Wireless Headphones",
    image: "/images/product1.jpg",
    price: 1499,
    qty: 2,
  },
  {
    id: 2,
    name: "Smart Fitness Band",
    image: "/images/product2.jpg",
    price: 999,
    qty: 1,
  },
];

// Dummy shipping methods
const shippingMethods = [
  {
    id: "standard",
    name: "Standard Shipping",
    time: "3-5 business days",
    cost: 49,
  },
  {
    id: "express",
    name: "Express Delivery",
    time: "Next-day delivery",
    cost: 149,
  },
  {
    id: "free",
    name: "Free Shipping",
    time: "5-8 business days",
    cost: 0,
  },
];

// Dummy payment methods
const paymentMethods = [
  { id: "card", name: "Credit/Debit Card" },
  { id: "upi", name: "UPI" },
  { id: "paypal", name: "PayPal" },
  { id: "gpay", name: "Google Pay" },
  { id: "applepay", name: "Apple Pay" },
  { id: "netbanking", name: "Net Banking" },
];

const TAX_RATE = 0.12; // 12% GST
const COUPON = { code: "TREND10", discount: 10 }; // ₹10 off

const Checkout = () => {
  const [shipping, setShipping] = useState(shippingMethods[0]);
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [info, setInfo] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
    card: "",
    exp: "",
    cvv: "",
    cardName: "",
    upi: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingCost = shipping.cost;
  const discount = couponApplied ? COUPON.discount : 0;
  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const grandTotal = subtotal + shippingCost + tax - discount;

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoupon = (e) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === COUPON.code) setCouponApplied(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  return (
    <div className="checkout-main">
      <h1 className="checkout-title">Checkout</h1>
      <div className="checkout-container">
        {/* Left: Customer Info, Shipping, Payment */}
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <section className="checkout-section">
            <h2>Customer Information</h2>
            <div className="checkout-row">
              <input
                name="first"
                type="text"
                placeholder="First Name *"
                value={info.first}
                onChange={handleInfoChange}
                required
              />
              <input
                name="last"
                type="text"
                placeholder="Last Name *"
                value={info.last}
                onChange={handleInfoChange}
                required
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email Address *"
              value={info.email}
              onChange={handleInfoChange}
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={info.phone}
              onChange={handleInfoChange}
            />
            <input
              name="address"
              type="text"
              placeholder="Street Address *"
              value={info.address}
              onChange={handleInfoChange}
              required
            />
            <input
              name="apt"
              type="text"
              placeholder="Apartment/Suite/Unit"
              value={info.apt}
              onChange={handleInfoChange}
            />
            <div className="checkout-row">
              <input
                name="city"
                type="text"
                placeholder="City *"
                value={info.city}
                onChange={handleInfoChange}
                required
              />
              <input
                name="state"
                type="text"
                placeholder="State/Province *"
                value={info.state}
                onChange={handleInfoChange}
                required
              />
            </div>
            <div className="checkout-row">
              <input
                name="zip"
                type="text"
                placeholder="Zip/Postal Code *"
                value={info.zip}
                onChange={handleInfoChange}
                required
              />
              <input
                name="country"
                type="text"
                placeholder="Country *"
                value={info.country}
                onChange={handleInfoChange}
                required
              />
            </div>
          </section>
          <section className="checkout-section">
            <h2>Shipping Method</h2>
            <div className="shipping-options">
              {shippingMethods.map((method) => (
                <label key={method.id} className={`shipping-option${shipping.id === method.id ? " selected" : ""}`}>
                  <input
                    type="radio"
                    name="shipping"
                    value={method.id}
                    checked={shipping.id === method.id}
                    onChange={() => setShipping(method)}
                  />
                  <span>
                    <b>{method.name}</b> ({method.time}) —{" "}
                    {method.cost === 0 ? "Free" : `₹${method.cost}`}
                  </span>
                </label>
              ))}
            </div>
          </section>
          <section className="checkout-section">
            <h2>Payment Information</h2>
            <div className="payment-methods">
              {paymentMethods.map((pm) => (
                <label key={pm.id} className={`payment-option${payment === pm.id ? " selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={pm.id}
                    checked={payment === pm.id}
                    onChange={() => setPayment(pm.id)}
                  />
                  {pm.name}
                </label>
              ))}
            </div>
            {payment === "card" && (
              <div className="card-fields">
                <input
                  name="card"
                  type="text"
                  placeholder="Card Number *"
                  value={info.card}
                  onChange={handleInfoChange}
                  required
                />
                <div className="checkout-row">
                  <input
                    name="exp"
                    type="text"
                    placeholder="MM/YY *"
                    value={info.exp}
                    onChange={handleInfoChange}
                    required
                  />
                  <input
                    name="cvv"
                    type="text"
                    placeholder="CVV *"
                    value={info.cvv}
                    onChange={handleInfoChange}
                    required
                  />
                </div>
                <input
                  name="cardName"
                  type="text"
                  placeholder="Cardholder Name"
                  value={info.cardName}
                  onChange={handleInfoChange}
                />
              </div>
            )}
            {payment === "upi" && (
              <input
                name="upi"
                type="text"
                placeholder="UPI ID *"
                value={info.upi}
                onChange={handleInfoChange}
                required
              />
            )}
          </section>
          <div className="checkout-cta-row">
            <button className="checkout-btn" type="submit">
              {orderPlaced ? "Order Placed!" : "Place Order"}
            </button>
            <div className="checkout-safe">
              <span className="checkout-lock">🔒</span> 100% Secure Payment
            </div>
          </div>
          {orderPlaced && (
            <div className="checkout-success">
              <span role="img" aria-label="Success">✅</span> Thank you! Your order has been placed.
            </div>
          )}
          <div className="checkout-policy-links">
            <Link to="/privacy-policy">Privacy Policy</Link> |{" "}
            <Link to="/terms">Terms of Service</Link> |{" "}
            <Link to="/return-refund">Return Policy</Link>
          </div>
          <div className="checkout-support">
            Need help? <a href="mailto:support@trendora.com">Contact Support</a>
          </div>
        </form>
        {/* Right: Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="checkout-summary-list">
            {cartItems.map((item) => (
              <div className="checkout-summary-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <div className="checkout-summary-name">{item.name}</div>
                  <div className="checkout-summary-qty">
                    Qty: {item.qty} × <span>₹{item.price}</span>
                  </div>
                </div>
                <div className="checkout-summary-total">
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}
          </div>
          <form className="checkout-coupon-row" onSubmit={handleCoupon}>
            <input
              type="text"
              placeholder="Coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              disabled={couponApplied}
            />
            <button type="submit" disabled={couponApplied}>
              {couponApplied ? "Applied" : "Apply"}
            </button>
          </form>
          <div className="checkout-summary-breakdown">
            <div>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div>
              <span>Shipping</span>
              <span>{shippingCost === 0 ? "Free" : `₹${shippingCost}`}</span>
            </div>
            <div>
              <span>Tax (GST 12%)</span>
              <span>₹{tax}</span>
            </div>
            {couponApplied && (
              <div>
                <span>Discount ({COUPON.code})</span>
                <span>-₹{COUPON.discount}</span>
              </div>
            )}
            <div className="checkout-grand-total">
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
          <div className="checkout-badges">
            <img src="/images/secure-payment.png" alt="Secure Payment" />
            <img src="/images/ssl-badge.png" alt="SSL Secured" />
            <img src="/images/guarantee.png" alt="Guarantee" />
          </div>
          <div className="checkout-guarantee">
            <span role="img" aria-label="guarantee">🛡️</span> 7-Day Return Guarantee
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;