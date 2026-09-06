import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTooth,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaFacebook,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/services", label: "Our Services" },
  { to: "/booking", label: "Book Appointment" },
  { to: "/contact", label: "Contact" },
  { to: "/login", label: "Login" },
  { to: "/signup", label: "Sign Up" },
];

const clinicServices = [
  "Dental Cleaning",
  "Teeth Whitening",
  "Dental Checkup",
  "Root Canal Treatment",
  "Crowns & Bridges",
  "Braces & Aligners",
];

function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Newsletter strip */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white">Stay Updated</h3>
            <p className="text-slate-400 text-sm mt-1">
              Subscribe for dental care tips and special offers.
            </p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-full text-sm font-medium">
              <FaCheckCircle /> Thanks for subscribing!
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md bg-slate-800 rounded-full p-1.5 pl-5"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:opacity-95 transition shrink-0"
              >
                <FaPaperPlane size={13} />
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-700 text-white flex items-center justify-center shadow-md">
              <FaTooth size={20} />
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold text-white">Bright Smile</span>
              <span className="block text-[11px] tracking-widest uppercase text-slate-400">
                Dental
              </span>
            </span>
          </Link>
          <p className="text-sm text-slate-400 mt-4 leading-relaxed">
            Your trusted dental clinic in Kathmandu. Modern equipment, gentle care,
            and healthy smiles for the whole family.
          </p>
          <a
            href="https://www.facebook.com/brightsmilenepal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium px-4 py-2.5 rounded-full transition"
          >
            <FaFacebook className="text-cyan-400" size={16} />
            Follow us on Facebook
          </a>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="text-slate-400 hover:text-cyan-400 transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-semibold mb-4">Our Services</h4>
          <ul className="space-y-2.5 text-sm">
            {clinicServices.map((s) => (
              <li key={s}>
                <Link to="/services" className="text-slate-400 hover:text-cyan-400 transition">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-4">Get in Touch</h4>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-cyan-400 mt-0.5 shrink-0" />
              Kathmandu, Nepal
            </li>
            <li className="flex items-center gap-3">
              <a
                href="tel:01-4519594"
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition"
              >
                <FaPhone className="text-cyan-400 shrink-0" />
                01-4519594
              </a>
            </li>
            <li>
              <a
                href="mailto:drsachin1108@gmail.com"
                className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition"
              >
                <FaEnvelope className="text-cyan-400 shrink-0" />
                drsachin1108@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <FaClock className="text-cyan-400 mt-0.5 shrink-0" />
              <span>
                Sunday - Friday
                <br />
                10:00 AM - 6:00 PM
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Map */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h4 className="text-white font-semibold mb-4">Find Us Here</h4>
          <div className="rounded-2xl overflow-hidden ring-1 ring-slate-700">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!4v1772529149932!6m8!1m7!1sCAoSHENJQUJJaEQxc2I4LVNKRUg0Mk9UWldvQkpMMTY.!2m2!1d27.71634353210872!2d85.32463993010771!3f105.44173812397725!4f-1.7223461063962304!5f0.7820865974627469"
              width="100%"
              height="320"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-slate-500">
            © {new Date().getFullYear()} Bright Smile Dental Pvt Ltd. All rights reserved.
          </p>
          <p className="text-slate-500">Your smile is our priority.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;