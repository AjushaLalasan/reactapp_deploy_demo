import { useEffect, useState } from "react";
import API from "../api/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "" });
  const [editingId, setEditingId] = useState(null); // track editing product

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      // Edit product
      await API.put(`/products/${editingId}`, form);
      setEditingId(null); // reset editing
    } else {
      // Add new product
      await API.post("/products", form);
    }

    setForm({ name: "", price: "" });
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price });
    setEditingId(product._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Products</h2>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6 items-center">
        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <ul className="space-y-2">
        {products.map((p) => (
          <li
            key={p._id}
            className="flex justify-between items-center p-3 border border-gray-200 rounded shadow-sm"
          >
            <div>
              <span className="font-medium">{p.name}</span> -{" "}
              <span className="text-gray-700">₹{p.price}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
