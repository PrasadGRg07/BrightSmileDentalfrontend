import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const info = [
    {
      icon: FaMapMarkerAlt,
      label: "Address",
      value: "Kathmandu, Nepal",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "01-4519594",
      href: "tel:01-4519594",
    },
    {
      icon: FaEnvelope,
      label: "Email",
      value: "drsachin1108@gmail.com",
      href: "mailto:drsachin1108@gmail.com",
    },
    {
      icon: FaClock,
      label: "Opening Hours",
      value: "Sun - Fri: 10:00 AM - 6:00 PM",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-800 pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Have a question or ready to book? Get in touch with our friendly team.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10">
        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Get in Touch</h2>
          <div className="space-y-4 mb-6">
            {info.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl shrink-0">
                  <item.icon />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-500">{item.label}</p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-blue-700 hover:underline font-medium"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-800 font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://www.facebook.com/brightsmilenepal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#1877F2] text-white px-5 py-3 rounded-xl hover:opacity-90 transition w-fit"
          >
            <FaFacebook size={22} />
            <span>Follow us on Facebook</span>
          </a>
        </div>

        {/* Contact form */}
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Send a Message</h2>
          {sent && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-xl mb-4">
              <FaCheckCircle /> Thank you! Your message has been sent.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              name="subject"
              required
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              required
              placeholder="Your Message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-800 transition"
            >
              <FaPaperPlane /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Map */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="w-full h-96 rounded-2xl overflow-hidden shadow-md">
          <iframe
            title="Google Map Location"
            src="https://www.google.com/maps/embed?pb=!4v1772529149932!6m8!1m7!1sCAoSHENJQUJJaEQxc2I4LVNKRUg0Mk9UWldvQkpMMTY.!2m2!1d27.71634353210872!2d85.32463993010771!3f105.44173812397725!4f-1.7223461063962304!5f0.7820865974627469"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
