import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Admin.css";
import API from "../utils/api";

const isAdmin = true;

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const token = API.defaults.headers.common['Authorization']?.replace('Bearer ', '');

  useEffect(() => {
    if (!productId) {
      setError("No product ID provided.");
      setLoading(false);
      return;
    }
    API.get(`/api/product/${productId}`)
      .then((res) => {
        setProduct({
          ...res.data,
          images: res.data.images?.length ? res.data.images : [""],
          colorOptions: res.data.colorOptions?.length ? res.data.colorOptions : [""],
          sizeOptions: res.data.sizeOptions?.length ? res.data.sizeOptions : [""],
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product.");
        setLoading(false);
      });
  }, [productId]);

  if (!isAdmin) {
    return (
      <>
        <AdminNavbar />
        <div className="addproduct-main">
          <div className="addproduct-header">
            <h1>Unauthorized</h1>
            <p>You do not have permission to edit products.</p>
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
            <h1>Loading Product...</h1>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="addproduct-main">
          <div className="addproduct-header">
            <h1>Error</h1>
            <p>{error}</p>
          </div>
        </div>
      </>
    );
  }

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
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", product.title);
      formData.append("brand", product.brand);
      formData.append("category", product.category);
      formData.append("sku", product.sku);
      formData.append("price", product.price);
      formData.append("mrp", product.mrp);
      formData.append("stock", product.stock);
      formData.append("featured", product.featured);
      formData.append("rating", product.rating);
      formData.append("reviews", product.reviews);
      formData.append("description", product.description);
      formData.append("details", product.details);

      product.colorOptions.forEach((color) => formData.append("colorOptions[]", color));
      product.sizeOptions.forEach((size) => formData.append("sizeOptions[]", size));

      product.images.forEach((img) => {
        if (img instanceof File) {
          formData.append("images", img);
        } else if (typeof img === "string" && img.trim() !== "") {
          formData.append("images", img);
        }
      });

      await API.put(`/api/product/${productId}`, formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate("/allproducts");
      }, 2000);
    } catch {
      setError("Server error while updating.");
    }
  };

  return (
    <>
      <div className="addproduct-main">
        <div className="addproduct-header">
          <h1>
            <span className="addproduct-icon">✏️</span> Edit Product
          </h1>
          <p className="addproduct-tagline">
            Update product details and save changes.
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
              <input name="category" value={product.category} onChange={handleChange} required />
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
            <label>Product Images (URLs or Upload) *</label>
            {product.images.map((img, idx) => (
              <div key={idx} className="addproduct-array-row">
                <input
                  type="text"
                  value={typeof img === "string" ? img : ""}
                  onChange={e => handleArrayChange("images", idx, e.target.value)}
                  placeholder={`Image URL #${idx + 1}`}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file) handleArrayChange("images", idx, file);
                  }}
                />
                <button type="button" onClick={() => handleRemoveField("images", idx)} disabled={product.images.length === 1}>✖</button>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={() => handleAddField("images")}>+ Add Image</button>
          </div>
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
            Save Changes
          </button>
          {success && (
            <div className="addproduct-success">
              <span role="img" aria-label="Success">✅</span> Product updated successfully!
            </div>
          )}
          {error && (
            <div className="addproduct-error">
              <span role="img" aria-label="Error">❌</span> {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default EditProduct;