// src/utils/api.jsx
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000  ",
  headers: {
    "Content-Type": "application/json",
  },
});

// request interceptor to add token
API.interceptors.request.use((config) => {
  // ADMIN TOKEN FIRST (PRIORITY!)
  const adminToken = localStorage.getItem("adminToken");
  if (adminToken) {
    config.headers["Authorization"] = `Bearer ${adminToken}`;
    return config; // EXIT EARLY!
  }
  
  // USER TOKEN SECOND
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});


// export default or named exports as you have in current file
export default API;
 