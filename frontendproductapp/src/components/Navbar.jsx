import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex items-center gap-4 px-6 py-3 border-b border-gray-300 bg-white">
      <Link to="/" className="text-black hover:underline">
        Home
      </Link>

      <Link to="/products" className="text-black hover:underline">
        Products
      </Link>

      <Link to="/login" className="text-black hover:underline">
        Login
      </Link>

      <Link to="/signup" className="text-black hover:underline">
        Signup
      </Link>

      <div className="ml-auto">
        {!token ? (
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-1 bg-black text-white rounded hover:bg-gray-800"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="px-4 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
