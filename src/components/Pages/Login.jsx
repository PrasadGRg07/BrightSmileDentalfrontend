import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTooth, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../utils/api";

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Step 1: Login to get tokens
      const res = await api.post("auth/login/", {
        username: form.username,
        password: form.password,
      });
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      // Step 2: Fetch current user's profile to get their role
      const profileRes = await api.get("auth/me/");
      const user = profileRes.data;
      localStorage.setItem("userRole", user.role);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userFullName", `${user.first_name} ${user.last_name}`.trim() || user.username);

      // Step 3: Redirect based on role
      const role = user.role;
      if (role === "Admin") {
        localStorage.setItem("adminLoggedIn", "true");
        navigate("/admin/dashboard", { replace: true });
      } else if (role === "Doctor") {
        navigate("/dashboard/doctor", { replace: true });
      } else if (role === "Dentist") {
        navigate("/dashboard/dentist", { replace: true });
      } else if (role === "Receptionist") {
        navigate("/dashboard/receptionist", { replace: true });
      } else {
        // Patient or any other role
        navigate("/dashboard/patient", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-cyan-900 flex items-center justify-center px-4 py-24">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <FaTooth className="text-5xl text-blue-700 mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-blue-900">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Log in to your account</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 text-red-600 p-3 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              required
              placeholder="Your username"
              value={form.username}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPwd ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPwd ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white font-medium py-3 rounded-xl hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
