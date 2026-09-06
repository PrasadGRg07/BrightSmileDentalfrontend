import { Link } from "react-router-dom";
import {
  FaTooth,
  FaSmile,
  FaStar,
  FaUserMd,
  FaClock,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaShieldAlt,
  FaHeartbeat,
  FaWallet,
  FaArrowRight,
} from "react-icons/fa";

const services = [
  {
    icon: FaTooth,
    title: "Dental Checkup",
    desc: "Comprehensive oral examinations to catch issues early and keep your smile healthy.",
  },
  {
    icon: FaSmile,
    title: "Teeth Whitening",
    desc: "Safe, professional whitening treatments for a brighter, more confident smile.",
  },
  {
    icon: FaShieldAlt,
    title: "Dental Cleaning",
    desc: "Professional cleaning to remove plaque, tartar, and stains for fresh, healthy gums.",
  },
  {
    icon: FaUserMd,
    title: "Root Canal Treatment",
    desc: "Painless, modern root canal therapy to save damaged teeth and relieve discomfort.",
  },
  {
    icon: FaHeartbeat,
    title: "Crowns & Bridges",
    desc: "Restore missing or damaged teeth with durable, natural-looking restorations.",
  },
  {
    icon: FaWallet,
    title: "Orthodontics",
    desc: "Braces and aligners to straighten teeth and correct bite issues for all ages.",
  },
];

const whyUs = [
  {
    icon: FaStar,
    title: "Experienced Dentists",
    desc: "A team of skilled professionals with years of experience across all dental fields.",
  },
  {
    icon: FaShieldAlt,
    title: "Modern Equipment",
    desc: "State-of-the-art technology for accurate diagnosis and comfortable treatment.",
  },
  {
    icon: FaSmile,
    title: "Gentle Care",
    desc: "We prioritize your comfort with a friendly, patient-first approach to every visit.",
  },
  {
    icon: FaClock,
    title: "Flexible Hours",
    desc: "Convenient appointment times designed around your busy schedule.",
  },
];

export default function LandingPage() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="inline-block bg-white/10 text-blue-100 px-4 py-1 rounded-full text-sm">
              Kathmandu, Nepal
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Your Trusted Partner for a{" "}
              <span className="text-cyan-300">Bright Smile</span>
            </h1>
            <p className="text-blue-100 text-lg">
              At Bright Smile Dental, we combine advanced technology with gentle,
              compassionate care to give you the healthy, beautiful smile you deserve.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-cyan-400 text-blue-950 font-semibold px-6 py-3 rounded-xl hover:bg-cyan-300 transition"
              >
                Book an Appointment <FaArrowRight />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Our Services
              </Link>
            </div>
          </div>
          <div className="hidden md:block text-center">
            <div className="w-72 h-72 mx-auto rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/30 flex items-center justify-center">
              <FaTooth className="text-[10rem] text-cyan-200 drop-shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["15+", "Years Experience"],
            ["5000+", "Happy Patients"],
            ["20+", "Dental Services"],
            ["4.9", "Average Rating"],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="text-3xl md:text-4xl font-bold text-blue-900">{num}</p>
              <p className="text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
            Our Dental Services
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Complete dental care for the whole family — from routine checkups to advanced treatments.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl mb-4">
                <s.icon />
              </div>
              <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-blue-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-800 transition"
          >
            View All Services <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-blue-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us</h2>
            <p className="text-blue-200 mt-3 max-w-2xl mx-auto">
              We are dedicated to making every visit comfortable, transparent, and effective.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {whyUs.map((w) => (
              <div key={w.title} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center text-3xl mb-4">
                  <w.icon />
                </div>
                <h3 className="font-semibold text-lg mb-2">{w.title}</h3>
                <p className="text-blue-200 text-sm">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview / CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Caring for Your Smile Since 2011
          </h2>
          <p className="text-gray-600 mb-6">
            Bright Smile Dental Pvt Ltd is a modern dental clinic in Kathmandu dedicated
            to providing high-quality, affordable dental care. Our friendly team uses the
            latest techniques to ensure every patient leaves with a smile.
          </p>
          <ul className="space-y-3 mb-8">
            {[
              "Certified and experienced dental professionals",
              "Comfortable, hygienic and modern facilities",
              "Personalized treatment plans for every patient",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-blue-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-800 transition"
          >
            Learn More About Us <FaArrowRight />
          </Link>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-xl font-semibold text-blue-900 mb-6">Visit Our Clinic</h3>
          <div className="space-y-4 text-gray-600">
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-700" /> Kathmandu, Nepal
            </p>
            <p className="flex items-center gap-3">
              <FaPhone className="text-blue-700" /> 01-4519594
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-blue-700" /> drsachin1108@gmail.com
            </p>
            <p className="flex items-center gap-3">
              <FaClock className="text-blue-700" /> Sun - Fri, 10:00 AM - 6:00 PM
            </p>
          </div>
          <div className="mt-6 w-full h-56 rounded-xl overflow-hidden">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!4v1772529149932!6m8!1m7!1sCAoSHENJQUJJaEQxc2I4LVNKRUg0Mk9UWldvQkpMMTY.!2m2!1d27.71634353210872!2d85.32463993010771!3f105.44173812397725!4f-1.7223461063962304!5f0.7820865974627469"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-cyan-500 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready for a Healthier Smile?
          </h2>
          <p className="text-blue-50 mb-8 text-lg">
            Book your appointment today and take the first step towards excellent oral health.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-white text-blue-800 font-semibold px-8 py-3 rounded-xl hover:bg-blue-50 transition"
          >
            Book an Appointment Now <FaArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
