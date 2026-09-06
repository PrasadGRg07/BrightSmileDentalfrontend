import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaGraduationCap,
  FaBriefcaseMedical,
  FaLanguage,
  FaCheckCircle,
  FaCalendarCheck,
} from "react-icons/fa";
import { getDoctorById } from "../../data/doctors";
import DoctorsSection from "../Doctors/DoctorsSection";

export default function DoctorDetail() {
  const { id } = useParams();
  const doctor = getDoctorById(id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 pt-40 text-center px-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">Doctor Not Found</h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-800 transition"
        >
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition mb-8"
          >
            <FaArrowLeft /> Back to About Us
          </Link>
          <div className="grid md:grid-cols-[280px_1fr] gap-8 items-center">
            <div className="w-64 h-64 rounded-2xl overflow-hidden ring-4 ring-cyan-400/40 shadow-xl bg-white mx-auto md:mx-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{doctor.name}</h1>
              <p className="text-cyan-300 text-xl font-medium mb-4">{doctor.specialty}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <FaGraduationCap /> {doctor.education}
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                  <FaBriefcaseMedical /> {doctor.experience} experience
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">About</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{doctor.bio}</p>

          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Treatments & Specialties
          </h3>
          <ul className="space-y-2">
            {doctor.services.map((s) => (
              <li key={s} className="flex items-start gap-2 text-gray-700">
                <FaCheckCircle className="text-green-500 mt-1" />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Languages Spoken
            </h3>
            <div className="flex flex-wrap gap-2">
              {doctor.languages.map((l) => (
                <span
                  key={l}
                  className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  <FaLanguage /> {l}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Book with {doctor.name}</h3>
            <p className="text-blue-200 mb-6">
              Schedule your appointment today at Bright Smile Dental.
            </p>
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-cyan-400 text-blue-950 font-semibold px-6 py-3 rounded-xl hover:bg-cyan-300 transition w-full justify-center"
            >
              <FaCalendarCheck /> Book an Appointment
            </Link>
          </div>
        </div>
      </section>

      {/* Other doctors */}
      <div className="border-t border-gray-200">
        <DoctorsSection title="Meet Our Other Doctors" />
      </div>
    </div>
  );
}