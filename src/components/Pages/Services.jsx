import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import {
  FaTooth,
  FaSmile,
  FaShieldAlt,
  FaUserMd,
  FaHeartbeat,
  FaChild,
  FaCheckCircle,
  FaArrowRight,
  FaClock,
  FaTag,
} from "react-icons/fa";

const categories = [
  {
    icon: FaShieldAlt,
    title: "Preventive Care",
    items: [
      "Routine Dental Checkups",
      "Professional Cleaning & Scaling",
      "Fluoride Treatment",
      "Pit & Fissure Sealants",
      "Oral Health Education",
    ],
  },
  {
    icon: FaSmile,
    title: "Cosmetic Dentistry",
    items: [
      "Teeth Whitening",
      "Veneers",
      "Smile Makeovers",
      "Aesthetic Fillings",
    ],
  },
  {
    icon: FaTooth,
    title: "Restorative Dentistry",
    items: [
      "Fillings & Restorations",
      "Crowns & Bridges",
      "Root Canal Treatment",
      "Dental Implants",
      "Dentures",
    ],
  },
  {
    icon: FaUserMd,
    title: "Orthodontics",
    items: [
      "Metal Braces",
      "Ceramic Braces",
      "Clear Aligners",
      "Bite Correction",
    ],
  },
  {
    icon: FaHeartbeat,
    title: "Oral Surgery",
    items: [
      "Tooth Extractions",
      "Wisdom Tooth Removal",
      "Impacted Tooth Surgery",
    ],
  },
  {
    icon: FaChild,
    title: "Pediatric Dentistry",
    items: [
      "Children's Checkups",
      "Cavity Prevention",
      "Child-Friendly Care",
    ],
  },
];

export default function Services() {
  const [dbServices, setDbServices] = useState([]);

  useEffect(() => {
    api.get("services/")
      .then(res => setDbServices(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Comprehensive dental care for the whole family, using modern techniques
            and state-of-the-art equipment.
          </p>
        </div>
      </section>

      {/* Live Services from Database */}
      {dbServices.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-900">Available Treatments & Pricing</h2>
            <p className="text-gray-500 mt-2">Book any of these services directly online.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dbServices.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-5 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-700 text-white flex items-center justify-center text-xl shadow-sm shrink-0">
                    <FaTooth />
                  </div>
                  <h3 className="font-bold text-blue-900 text-lg leading-tight">{s.name}</h3>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {s.description || "A professional dental treatment provided by our expert team."}
                  </p>

                  {/* Price & Duration */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-blue-700 font-bold text-lg">
                      <FaTag size={14} />
                      Rs. {Number(s.price).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <FaClock size={12} />
                      {s.duration_minutes} mins
                    </div>
                  </div>

                  <Link
                    to="/booking"
                    className="mt-4 flex items-center justify-center gap-2 w-full bg-blue-700 text-white text-sm font-medium py-2.5 rounded-xl hover:bg-blue-800 transition"
                  >
                    Book Now <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* General Categories */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-900">All Treatment Categories</h2>
          <p className="text-gray-500 mt-2">Everything we offer at Bright Smile Dental.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl mb-4">
                <cat.icon />
              </div>
              <h3 className="text-lg font-semibold mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 text-sm">
                    <FaCheckCircle className="text-green-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-900 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Not Sure What You Need?</h2>
          <p className="text-blue-200 max-w-xl mx-auto mb-8">
            Book a consultation and our team will help you find the right treatment
            for your needs.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-cyan-400 text-blue-950 font-semibold px-8 py-3 rounded-xl hover:bg-cyan-300 transition"
          >
            Book a Consultation <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
