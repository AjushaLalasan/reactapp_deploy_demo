import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "USER",
  });
  const navigate = useNavigate(); // add useNavigate

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending:", form); // debug

    try {
      const res = await API.post("/auth/register", form);
      alert(res.data.message);
      navigate("/login"); // redirect to login after successful signup
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Signup</h2>

        <input
          name="username"
          value={form.username}
          placeholder="Username"
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <input
          name="password"
          value={form.password}
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-6 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
