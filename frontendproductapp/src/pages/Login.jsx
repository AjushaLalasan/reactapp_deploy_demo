import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      console.log("Token:", res.data.token); //debug
      alert("Login successful");
      navigate("/products");
    } catch (err) {
      alert("Invalid credentials" + err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 p-6 border border-gray-300 rounded-lg shadow-md bg-white"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <br />
      <br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-black"
      />

      <br />
      <br />

      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
