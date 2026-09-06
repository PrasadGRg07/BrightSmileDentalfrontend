import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaShieldAlt, FaEye, FaEyeSlash, FaArrowLeft, FaInfoCircle } from "react-icons/fa";
import api from "../utils/api";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("auth/login/", {
        username: form.email,
        password: form.password
      });
      localStorage.setItem("accessToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);
      localStorage.setItem("adminLoggedIn", "true");
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition mb-6 text-sm"
        >
          <FaArrowLeft /> Back to Website
        </Link>

        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-900 text-cyan-300 flex items-center justify-center text-3xl mb-4">
              <FaShieldAlt />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Admin Login</h2>
            <p className="text-gray-500 text-sm">
              Bright Smile Dental Admin Panel
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-xl mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="admin@brightsmile.com"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
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
              className="w-full bg-blue-900 text-white font-medium py-3 rounded-xl hover:bg-blue-800 transition"
            >
              Login to Dashboard
            </button>
          </form>

          <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100 text-sm text-blue-800 flex gap-2">
            <FaInfoCircle className="mt-0.5 shrink-0" />
            <div>
              Demo credentials:
              <br />
              <strong>admin@brightsmile.com</strong> / <strong>admin123</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}