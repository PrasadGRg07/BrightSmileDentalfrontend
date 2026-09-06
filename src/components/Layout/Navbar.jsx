import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTooth,
  FaBars,
  FaTimes,
  FaCalendarCheck,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
} from "react-icons/fa";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="hidden lg:block bg-blue-950 text-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a
              href="tel:01-4519594"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <FaPhone size={12} className="text-cyan-400" />
              01-4519594
            </a>
            <a
              href="mailto:drsachin1108@gmail.com"
              className="flex items-center gap-2 hover:text-white transition"
            >
              <FaEnvelope size={12} className="text-cyan-400" />
              drsachin1108@gmail.com
            </a>
            <span className="hidden xl:flex items-center gap-2 text-blue-300">
              <FaClock size={12} className="text-cyan-400" />
              Sun - Fri: 10:00 AM - 6:00 PM
            </span>
          </div>
          <a
            href="https://www.facebook.com/brightsmilenepal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition"
          >
            <FaFacebook size={14} className="text-cyan-400" />
            Follow us on Facebook
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white flex items-center justify-center shadow-md">
              <FaTooth size={20} />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold text-blue-950">
                Bright Smile
              </span>
              <span className="block text-[11px] tracking-widest uppercase text-blue-500">
                Dental
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive(l.to)
                    ? "bg-blue-50 text-blue-800"
                    : "text-gray-600 hover:text-blue-800 hover:bg-gray-100"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Auth + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-blue-800 px-3 py-2 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full shadow-md hover:shadow-lg hover:opacity-95 transition"
            >
              <FaCalendarCheck size={14} />
              Book Appointment
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-blue-900 text-2xl p-1"
            aria-label="Toggle menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive(l.to)
                      ? "bg-blue-50 text-blue-800"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="text-center border border-blue-200 text-blue-700 px-4 py-2.5 rounded-xl text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/booking"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold"
                >
                  <FaCalendarCheck size={14} />
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;