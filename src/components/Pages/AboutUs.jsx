import {
  FaUserMd,
  FaTooth,
  FaShieldAlt,
  FaSmile,
  FaCheckCircle,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import DoctorsSection from "../Doctors/DoctorsSection";

const values = [
  {
    icon: FaSmile,
    title: "Patient First",
    desc: "Your comfort and well-being guide every decision we make.",
  },
  {
    icon: FaShieldAlt,
    title: "Integrity",
    desc: "Honest advice and transparent pricing with no hidden costs.",
  },
  {
    icon: FaUserMd,
    title: "Excellence",
    desc: "Continuous learning and modern techniques for the best outcomes.",
  },
  {
    icon: FaTooth,
    title: "Compassion",
    desc: "Gentle, understanding care for patients of all ages.",
  },
];

export default function AboutUs() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Learn more about Bright Smile Dental and the team dedicated to your oral health.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Our Story
          </h2>
          <p className="text-gray-600 mb-4">
            Bright Smile Dental Pvt Ltd was founded with a simple mission: to make
            high-quality dental care accessible, affordable, and comfortable for every
            patient in Kathmandu.
          </p>
          <p className="text-gray-600 mb-4">
            What started as a small clinic has grown into a trusted dental practice serving
            thousands of happy patients. We combine state-of-the-art equipment with a warm,
            friendly atmosphere so every visit feels stress-free.
          </p>
          <p className="text-gray-600">
            From routine cleanings to advanced restorative treatments, our team is here to
            help you achieve and maintain a healthy, beautiful smile for life.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <div className="text-center">
            <FaBriefcaseMedical className="text-6xl text-blue-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To deliver exceptional, patient-centered dental care using advanced
              technology, ensuring every patient leaves with a brighter smile and
              better health.
            </p>
          </div>
        </div>
      </section>

      {/* Our Doctors */}
      <div className="border-t border-gray-200">
        <DoctorsSection
          title="Meet Our Doctors"
          subtitle="Experienced, caring specialists here to give you the best dental care."
        />
      </div>

      {/* Values */}
      <section className="bg-white border-t border-b">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
              Our Core Values
            </h2>
            <p className="text-gray-500 mt-3">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center hover:shadow-md transition"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl mb-4">
                  <v.icon />
                </div>
                <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust us */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ul className="space-y-4">
            {[
              "15+ years of combined dental experience",
              "Modern, hygienic, and comfortable clinic",
              "Affordable pricing with transparent estimates",
              "Personalized care plans for every patient",
              "Friendly staff who truly care about your comfort",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-gradient-to-br from-blue-700 to-cyan-600 text-white p-8 rounded-2xl text-center">
            <p className="text-6xl mb-4">😁</p>
            <h3 className="text-2xl font-bold mb-2">
              Your Smile Is Our Priority
            </h3>
            <p className="text-blue-50 mb-6">
              Experience dental care you can trust at Bright Smile Dental.
            </p>
            <Link
              to="/booking"
              className="inline-block bg-white text-blue-800 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
