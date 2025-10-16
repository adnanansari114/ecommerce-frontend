import React, { useEffect, useState } from "react";
import "../styles/Admin.css";
import API from "../utils/api";

const OrderAccept = () => {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Admin token check
  const token = localStorage.getItem("adminToken"); // DIRECT!
  const isAdmin = !!token;

  // Fetch all orders (admin)
  useEffect(() => {
  if (!isAdmin) return;
  API.get("/api/orders/admin/all")
    .then((res) => {
      // Filter only accepted orders
      const acceptedOrders = Array.isArray(res.data)
        ? res.data.filter(order => order.status === "Accepted")
        : [];
      setOrders(acceptedOrders);
      setLoading(false);
    })
    .catch(() => {
      setMsg("Failed to load orders.");
      setLoading(false);
    });
}, [isAdmin]);

  if (!isAdmin) {
    return (
      <>
        <div className="addproduct-main">
          <div className="addproduct-header">
            <h1>Unauthorized</h1>
            <p>You do not have permission to view orders.</p>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div className="addproduct-main">
          <div className="addproduct-header">
            <h1>Loading Accepted Orders...</h1>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="order-accept-main">
        <div className="accept-container">
          <div className="addproduct-header">
            <h1>Accepted Orders</h1>
            <p>List of all orders accepted successfully</p>
          </div>

          {msg && <div className="order-accept-msg">{msg}</div>}

          <table className="order-accept-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="order-accept-empty">
                    No accepted orders found.
                  </td>
                </tr>
              )}

              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user?.email || "N/A"}</td>
                  <td>
                    {order.items.map((item) => (
                      <div key={item.product}>
                        {item.name} x {item.qty}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.total}</td>
                  <td>{order.status}</td>
                  <td>
                    <button
                      onClick={() => alert(JSON.stringify(order, null, 2))}
                      className="accept-btn"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrderAccept;