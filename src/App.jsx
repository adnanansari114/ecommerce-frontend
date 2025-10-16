import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './Privacy/About.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import AddProduct from './admin/AddProduct.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import OrderAccept from './admin/OrderAccept.jsx';
import AdminNavbar from './admin/AdminNavbar.jsx';
import EditProduct from './admin/EditProduct.jsx';
import OrderConfirmation from './user/OrderConfirmation.jsx';
import OrderDetail from './admin/OrderDetail.jsx';
import AllProduct from './admin/AllProduct.jsx';
import AdminProduct from './admin/AdminProduct.jsx';
import AdminContactMessages from './admin/AdminContactMessages.jsx';
import Checkout from './pages/Checkout.jsx';
import Loader from './components/Loader.jsx';
import ContactUs from './Privacy/ContactUs.jsx';
import PrivacyPolicy from './Privacy/PrivacyPolicy.jsx';
import FAQ from './Privacy/FAQ.jsx';
import ReturnRefund from './Privacy/ReturnRefund.jsx';
import ShippingPolicy from './Privacy/ShippingPolicy.jsx';
import Terms from './Privacy/Terms.jsx';
import Footer from './components/Footer.jsx';
import Profile from './user/Profile.jsx';
import EditProfile from './user/EditProfile.jsx';
import Cart from './user/Cart.jsx';
import Buy from './user/Buy.jsx';
import TrackOrder from './user/TrackOrder.jsx';
import UserDashboard from './user/UserDashboard.jsx';
import Wishlist from './user/Wishlist.jsx';
import OrderHistory from './user/OrderHistory.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';

function App() {
  const adminToken = localStorage.getItem("adminToken");
  return (
    <BrowserRouter>
    <ErrorBoundary>
      {adminToken ? <AdminNavbar /> : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminNavbar />} />
        <Route path="/admin/add-product" element={<AddProduct />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit-product/:productId" element={<EditProduct />} />
        <Route path="/admin/order-accept" element={<OrderAccept />} />
        <Route path="/admin/contact-messages" element={<AdminContactMessages />} />
        <Route path="/allproducts" element={<AllProduct />} />
        <Route path="/adminproduct/:id" element={<AdminProduct />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/admin/order-detail" element={<OrderDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/loader" element={<Loader />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/return-refund" element={<ReturnRefund />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/edit-profile" element={<EditProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/track-order/:id" element={<TrackOrder />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/wishlist" element={<Wishlist />} />
        {/* Add more routes here as needed */}
      </Routes>
      <Footer />
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App