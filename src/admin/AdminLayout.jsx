import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import {
  FaChartBar,
  FaCalendarCheck,
  FaEnvelope,
  FaTooth,
  FaUserMd,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { adminLogout } from "../utils/store";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: FaChartBar },
  { to: "/admin/bookings", label: "Bookings", icon: FaCalendarCheck },
  { to: "/admin/messages", label: "Messages", icon: FaEnvelope },
  { to: "/admin/services", label: "Services", icon: FaTooth },
  { to: "/admin/doctors", label: "Staff", icon: FaUserMd },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed inset-y-0 left-0 z-40 hidden md:flex">
        <div className="px-6 py-6 border-b border-slate-700">
          <h1 className="text-lg font-bold">Bright Smile Dental</h1>
          <p className="text-slate-400 text-xs mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-300"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`
              }
            >
              <item.icon />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-slate-700 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <FaHome /> View Website
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-200 hover:bg-slate-800 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 bg-slate-900 text-white z-40 px-4 py-4 flex justify-between items-center">
        <h1 className="font-bold text-sm">Bright Smile Dental Admin</h1>
        <div className="flex items-center gap-2">
          <Link to="/" className="text-slate-400 hover:text-white">
            <FaHome />
          </Link>
          <button onClick={handleLogout} className="text-red-400 hover:text-red-200">
            <FaSignOutAlt />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-slate-900 z-40 flex justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center text-[10px] py-1 px-3 rounded-lg ${
                isActive ? "text-cyan-300" : "text-slate-400"
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0 px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}