import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/User.css";
import defaultImg from "../assets/default-avatar.png";
import API from "../utils/api";

const TrackOrder = () => {
  const [order, setOrder] = useState(null);
  const [msg, setMsg] = useState("");
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
  }, [userToken, navigate]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const url = id ? `/api/orders/${id}` : `/api/orders`;
        const res = await API.get(url);
        setOrder(Array.isArray(res.data) ? res.data[0] : res.data);
      } catch {
        setMsg("Order not found.");
      }
    };
    if (userToken) fetchOrder();
  }, [userToken, id]);

  if (!order) {
    return (
      <div className="trackorder-main">
        <div className="trackorder-card">{msg || "Loading..."}</div>
      </div>
    );
  }

  const currentStep = order.statusHistory
    ? order.statusHistory.findIndex(h => h.status === order.status)
    : -1;

  return (
    <div className="trackorder-main">
      <div className="trackorder-card">
        <h2 className="trackorder-title">Order Tracking</h2>
        <div className="trackorder-info">
          <div><b>Order ID:</b> {order._id}</div>
          <div><b>Status:</b> <span className={`trackorder-status-${order.status?.toLowerCase()}`}>{order.status}</span></div>
          <div><b>Tracking #:</b> {order.tracking || "—"}</div>
          <div><b>Order Date:</b> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</div>
          <div><b>Delivery Estimate:</b> {order.deliveryEstimate || (order.status === "Delivered"
            ? order.statusHistory?.find(h => h.status === "Delivered")?.date?.slice(0, 10)
            : "—")}</div>
          <div><b>Shipping Address:</b> {order.shippingAddress
            ? `${order.shippingAddress.street || ""}, ${order.shippingAddress.city || ""}, ${order.shippingAddress.state || ""}, ${order.shippingAddress.zip || ""}, ${order.shippingAddress.country || ""}`
            : "—"}</div>
        </div>
        <div className="trackorder-items">
          <h3>Ordered Items</h3>
          {order.items.map((item, idx) => (
            <div className="trackorder-item" key={idx}>
              <img
                src={item.product?.images?.[0] || item.image || defaultImg}
                alt={item.product?.title || item.name}
                className="trackorder-item-img"
                onError={e => { e.target.src = defaultImg; }}
              />
              <div>
                <div className="trackorder-item-name">{item.product?.title || item.name}</div>
                <div className="trackorder-item-qty">
                  Qty: {item.qty} × ₹{item.product?.price || item.price}
                </div>
                <div className="trackorder-item-total">
                  Total: ₹{(item.product?.price || item.price) * item.qty}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="trackorder-progress">
          <h3>Order Progress</h3>
          <div className="trackorder-steps">
            {order.statusHistory && order.statusHistory.map((step, idx) => (
              <div
                className={`trackorder-step ${idx <= currentStep ? "active" : ""}`}
                key={idx}
              >
                <div className="trackorder-step-dot">
                  {idx < currentStep
                    ? "✔"
                    : idx === currentStep
                      ? "⏳"
                      : ""}
                </div>
                <div className="trackorder-step-info">
                  <div className="trackorder-step-status">{step.status}</div>
                  <div className="trackorder-step-date">
                    {step.date ? new Date(step.date).toLocaleDateString() : ""}
                  </div>
                </div>
                {idx < order.statusHistory.length - 1 && (
                  <div className="trackorder-step-line"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="trackorder-summary">
          <h3>Order Summary</h3>
          <div>
            <b>Subtotal:</b> ₹{order.subtotal || order.items?.reduce((sum, i) => sum + (i.product?.price || i.price) * i.qty, 0)}
          </div>
          <div>
            <b>Shipping:</b> {order.shipping === 0 || order.shipping === "0" || order.shipping === undefined ? "Free" : `₹${order.shipping}`}
          </div>
          <div>
            <b>Tax:</b> ₹{order.tax || 0}
          </div>
          <div>
            <b>Discount:</b> -₹{order.discount || 0}
          </div>
          <div className="trackorder-grand">
            <b>Grand Total:</b> ₹{order.grandTotal || order.total || order.subtotal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
