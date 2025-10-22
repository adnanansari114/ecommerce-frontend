import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { FilterContext } from "../context/FilterContext.jsx";
import API from "../utils/api";
import '../styles/components.css';

const NavbarFilter = () => {
  const { filters, updateFilters, resetFilters, filterCount } = useContext(FilterContext);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const navigate = useNavigate(); 
  const location = useLocation(); 

  useEffect(() => {
    API.get("/api/category")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));

    API.get("/api/product/colors")
      .then((res) => setColors(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFilters = { ...filters };

    if (name === "price") {
      newFilters.priceRange = value;
      if (value) {
        const [min, max] = value.split("-");
        newFilters.minPrice = min || '';
        newFilters.maxPrice = max || '';
      } else {
        newFilters.minPrice = '';
        newFilters.maxPrice = '';
      }
    } else if (name === "rating") {
      newFilters.minRating = value;
    } else {
      newFilters[name] = value;
    }

    updateFilters(newFilters);

    if (location.pathname !== '/products' && (value || name === 'search')) {
      navigate('/products');
    }
  };

  return (
    <div className="container">
      <div className="nav-two">
        <div className="nav-two-left">
          <ul>
            <li>
              <select name="category" value={filters.category} onChange={handleChange}>
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </li>
            <li>
              <select name="price" value={filters.priceRange} onChange={handleChange}>
                <option value="">All Prices</option>
                <option value="0-500">Below ₹500</option>
                <option value="500-1000">₹500 - ₹1000</option>
                <option value="1000-2000">₹1000 - ₹2000</option>
                <option value="2000-5000">₹2000 - ₹5000</option>
                <option value="5000-">Above ₹5000</option>
              </select>
            </li>
            <li>
              <select name="color" value={filters.color} onChange={handleChange}>
                <option value="">All Colors</option>
                {colors.map((col, idx) => (
                  <option key={idx} value={col}>{col}</option>
                ))}
              </select>
            </li>
            <li>
              <select name="rating" value={filters.minRating} onChange={handleChange}>
                <option value="">All Ratings</option>
                <option value="4">4★ & above</option>
                <option value="3">3★ & above</option>
                <option value="2">2★ & above</option>
                <option value="1">1★ & above</option>
              </select>
            </li>
            <li>
              <input
                type="text"
                name="search"
                placeholder="Search..."
                value={filters.search}
                onChange={handleChange}
              />
            </li>
          </ul>
        </div>
        <div className="nav-two-right">
          <p>{filterCount} {filterCount === 1 ? 'filter' : 'filters'} applied</p>
          <button onClick={() => {
            resetFilters();
            if (location.pathname !== '/products') navigate('/products');
          }}>Reset</button> 
        </div>
      </div>
    </div>
  );
};

export default NavbarFilter;