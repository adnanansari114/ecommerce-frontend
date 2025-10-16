import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/User.css";
import API from "../utils/api";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userToken = localStorage.getItem("token");

  useEffect(() => {
  API.get("/api/orders")
    .then(res => setOrders(Array.isArray(res.data) ? res.data : []));
}, [userToken]);

  if (!orders.length)
    return (
      <div className="order-history-main">
        <h2>My Orders</h2>
        <div className="order-history-empty">No orders yet.</div>
      </div>
    );

  return (
    <div className="order-history-main">
      <h2>My Orders</h2>
      <table className="order-history-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}</td>
              <td>{order.status}</td>
              <td>₹{order.total || order.grandTotal || order.subtotal}</td>
              <td>
                <Link to="/order-confirmation" state={{ order }} className="order-history-detail-btn">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;