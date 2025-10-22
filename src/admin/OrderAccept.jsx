import React, { useEffect, useState } from "react";
import "../styles/Admin.css";
import API from "../utils/api";

const OrderAccept = () => {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken");
  const isAdmin = !!token;

  useEffect(() => {
    if (!isAdmin) return;
    API.get("/api/orders/admin/all")
      .then((res) => {
        setOrders(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        setMsg("Failed to load orders.");
        setLoading(false);
      });
  }, [isAdmin]);

  const handleAction = async (orderId, status) => {
    try {
      await API.put(`/api/orders/admin/${orderId}`, { status });
      setOrders(orders.map(order =>
        order._id === orderId ? { ...order, status } : order
      ));
      setMsg(`Order ${status === "Accepted" ? "accepted" : "rejected"}!`);
    } catch {
      setMsg("Server error.");
    }
  };

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
            <h1>Loading Orders...</h1>
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
            <h1>All Orders</h1>
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
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan="6" className="order-accept-empty">
                    No orders found.
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
                    {order.status === "Processing" ? (
                      <>
                        <button
                          className="accept-btn"
                          onClick={() => handleAction(order._id, "Accepted")}
                        >
                          Accept
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => handleAction(order._id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span>—</span>
                    )}
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