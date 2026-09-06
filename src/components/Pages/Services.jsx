import { Link } from "react-router-dom";
import { allServices } from "../../data/services";
import {
  FaTooth,
  FaSmile,
  FaShieldAlt,
  FaUserMd,
  FaHeartbeat,
  FaChild,
  FaCheckCircle,
  FaArrowRight,
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

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-20">
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
                    <FaCheckCircle className="text-green-500 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Full list strip */}
      <section className="bg-white border-t border-b py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">
            Treatments We Offer
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {allServices.map((s) => (
              <span
                key={s}
                className="bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-medium"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          Not Sure What You Need?
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-8">
          Book a consultation and our team will help you find the right treatment
          for your needs.
        </p>
        <Link
          to="/booking"
          className="inline-flex items-center gap-2 bg-blue-700 text-white font-medium px-8 py-3 rounded-xl hover:bg-blue-800 transition"
        >
          Book a Consultation <FaArrowRight />
        </Link>
      </section>
    </div>
  );
}
