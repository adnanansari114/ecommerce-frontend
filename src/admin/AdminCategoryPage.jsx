import React, { useEffect, useState } from "react";
import API from "../utils/api";
import "../styles/Admin.css";

const AdminCategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState([""]);
  const [editingId, setEditingId] = useState(null);
  const adminToken = localStorage.getItem("adminToken");

  const fetchCategories = async () => {
    const res = await API.get("/api/category");
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, subcategories };
    if (!name) return alert("Category name required");

    if (editingId) {
      await API.put(`/api/category/${editingId}`, data);
      setEditingId(null);
    } else {
      await API.post("/api/category", data);
    }
    setName("");
    setSubcategories([""]);
    fetchCategories();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this category?")) {
      await API.delete(`/api/category/${id}`);
      fetchCategories();
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
    setSubcategories(cat.subcategories);
  };

  const handleSubChange = (idx, val) => {
    const arr = [...subcategories];
    arr[idx] = val;
    setSubcategories(arr);
  };

  return (
    <div className="addproduct-main">
      <div className="addproduct-header">
        <h1>Manage Categories</h1>
      </div>

      <form className="addproduct-form" onSubmit={handleSubmit}>
        <input
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Subcategories</label>
        {subcategories.map((s, i) => (
          <div key={i} className="addproduct-array-row">
            <input
              value={s}
              onChange={(e) => handleSubChange(i, e.target.value)}
              placeholder={`Subcategory #${i + 1}`}
            />
            <button type="button" onClick={() => setSubcategories(subcategories.filter((_, idx) => idx !== i))}>✖</button>
          </div>
        ))}
        <button type="button" className="add-btn" onClick={() => setSubcategories([...subcategories, ""])}>+ Add Subcategory</button>
        <button type="submit" className="addproduct-submit-btn">
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Subcategories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.subcategories.join(", ")}</td>
              <td>
                <button onClick={() => handleEdit(c)}>✏️ Edit</button>
                <button onClick={() => handleDelete(c._id)}>🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategoryPage;
