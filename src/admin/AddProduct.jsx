import React, { useState } from "react";
import "../styles/Admin.css";
import API from "../utils/api";

const initialState = {
  title: "",
  brand: "",
  images: [""],
  price: "",
  mrp: "", 
  description: "",
  details: "",
  colorOptions: [""],
  sizeOptions: [""],
  rating: "",
  reviews: "",
  stock: "",
  sku: "",
  category: "",
  featured: false,
};

const AddProduct = () => {
  const [product, setProduct] = useState(initialState);
  const [success, setSuccess] = useState(false);
  const [msg, setMsg] = useState("");
  const adminToken = localStorage.getItem("adminToken");

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
  API.get("/api/category/")
    .then(res => {
      console.log("Fetched categories:", res.data);
      setCategories(res.data);
    })
    .catch(err => {
      console.error("Error fetching categories:", err);
      setCategories([]);
    });
}, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (name, idx, value) => {
    setProduct((prev) => {
      const arr = [...prev[name]];
      arr[idx] = value;
      return { ...prev, [name]: arr };
    });
  };
  const handleAddField = (name) => {
    setProduct((prev) => ({
      ...prev,
      [name]: [...prev[name], ""],
    }));
  };
  const handleRemoveField = (name, idx) => {
    setProduct((prev) => {
      const arr = [...prev[name]];
      arr.splice(idx, 1);
      return { ...prev, [name]: arr.length ? arr : [""] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!adminToken) {
      setMsg("Only admin can add products.");
      return;
    }
    try {
      const res = await fetch("/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        setSuccess(true);
        setMsg("Product added successfully!");
        setTimeout(() => setSuccess(false), 2500);
        setProduct(initialState);
      } else {
        const data = await res.json();
        setMsg(data.message || "Failed to add product.");
      }
    } catch {
      setMsg("Server error.");
    }
  };

  return (
    <>
      <div className="addproduct-main">
        <div className="addproduct-header">
          <h1>
            <span className="addproduct-icon">➕</span> Add New Product
          </h1>
          <p className="addproduct-tagline">
            Fill all details to add a new product to your store.
          </p>
        </div>
        <form className="addproduct-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="addproduct-row">
          <div className="addproduct-col">
            <label>Product Title *</label>
            <input name="title" value={product.title} onChange={handleChange} required />
          </div>
          <div className="addproduct-col">
            <label>Brand *</label>
            <input name="brand" value={product.brand} onChange={handleChange} required />
          </div>
        </div>
        <div className="addproduct-row">
          <div className="addproduct-col">
              <label>Category *</label>
              <select
                name="category"
                value={product.category}
                onChange={(e) => {
                  const selectedCategory = e.target.value;
                  setProduct((prev) => ({ ...prev, category: selectedCategory, subcategory: "" }));
                  const categoryObj = categories.find(c => c.name === selectedCategory);
                  setSubcategories(categoryObj ? categoryObj.subcategories : []);
                }}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="addproduct-col">
              <label>Subcategory *</label>
              <select
                name="subcategory"
                value={product.subcategory || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub, idx) => (
                  <option key={idx} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          <div className="addproduct-col">
            <label>SKU *</label>
            <input name="sku" value={product.sku} onChange={handleChange} required />
          </div>
        </div>
        <div className="addproduct-row">
          <div className="addproduct-col">
            <label>Price (₹) *</label>
            <input name="price" type="number" value={product.price} onChange={handleChange} required />
          </div>
          <div className="addproduct-col">
            <label>MRP (₹) *</label>
            <input name="mrp" type="number" value={product.mrp} onChange={handleChange} required />
          </div>
        </div>
        <div className="addproduct-row">
          <div className="addproduct-col">
            <label>Stock *</label>
            <input name="stock" type="number" value={product.stock} onChange={handleChange} required />
          </div>
          <div className="addproduct-col">
            <label>Featured</label>
            <input name="featured" type="checkbox" checked={product.featured} onChange={handleChange} />
          </div>
        </div>
        <div className="addproduct-row">
          <div className="addproduct-col">
            <label>Rating</label>
            <input name="rating" type="number" step="0.1" value={product.rating} onChange={handleChange} />
          </div>
          <div className="addproduct-col">
            <label>Reviews</label>
            <input name="reviews" type="number" value={product.reviews} onChange={handleChange} />
          </div>
        </div>
        <div className="addproduct-row">
          <div className="addproduct-col">
            <label>Description *</label>
            <textarea name="description" value={product.description} onChange={handleChange} required />
          </div>
          <div className="addproduct-col">
            <label>More Details</label>
            <textarea name="details" value={product.details} onChange={handleChange} />
          </div>
        </div>
        <div className="addproduct-array-field">
          <label>Product Images (URLs) *</label>
          {product.images.map((img, idx) => (
            <div key={idx} className="addproduct-array-row">
              <input
                value={img}
                onChange={e => handleArrayChange("images", idx, e.target.value)}
                required
                placeholder={`Image URL #${idx + 1}`}
              />
              <button type="button" onClick={() => handleRemoveField("images", idx)} disabled={product.images.length === 1}>✖</button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => handleAddField("images")}>+ Add Image</button>
        </div>
        {/* Colors */}
        <div className="addproduct-array-field">
          <label>Color Options *</label>
          {product.colorOptions.map((color, idx) => (
            <div key={idx} className="addproduct-array-row">
              <input
                value={color}
                onChange={e => handleArrayChange("colorOptions", idx, e.target.value)}
                required
                placeholder={`Color #${idx + 1}`}
              />
              <button type="button" onClick={() => handleRemoveField("colorOptions", idx)} disabled={product.colorOptions.length === 1}>✖</button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => handleAddField("colorOptions")}>+ Add Color</button>
        </div>
        <div className="addproduct-array-field">
          <label>Size Options *</label>
          {product.sizeOptions.map((size, idx) => (
            <div key={idx} className="addproduct-array-row">
              <input
                value={size}
                onChange={e => handleArrayChange("sizeOptions", idx, e.target.value)}
                required
                placeholder={`Size #${idx + 1}`}
              />
              <button type="button" onClick={() => handleRemoveField("sizeOptions", idx)} disabled={product.sizeOptions.length === 1}>✖</button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => handleAddField("sizeOptions")}>+ Add Size</button>
        </div>
        <button className="addproduct-submit-btn" type="submit">
            Add Product
          </button>
          {success && (
            <div className="addproduct-success">
              <span role="img" aria-label="Success">✅</span> Product added successfully!
            </div>
          )}
          {msg && !success && (
            <div className="addproduct-error">
              {msg}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AddProduct;