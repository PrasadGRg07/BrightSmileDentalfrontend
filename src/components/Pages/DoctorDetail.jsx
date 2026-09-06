import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaGraduationCap,
  FaBriefcaseMedical,
  FaLanguage,
  FaCheckCircle,
  FaCalendarCheck,
  FaCalendarAlt,
  FaUserMd
} from "react-icons/fa";
import api from "../../utils/api";
import DoctorsSection from "../Doctors/DoctorsSection";

export default function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`users/${id}/`)
      .then(res => {
        setDoctor(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading doctor profile...</div>;
  }

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
            <div className="w-64 h-64 rounded-2xl overflow-hidden ring-4 ring-cyan-400/40 shadow-xl bg-white mx-auto md:mx-0 flex items-center justify-center text-8xl text-blue-200">
              <FaUserMd />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{doctor.first_name} {doctor.last_name}</h1>
              <p className="text-cyan-300 text-xl font-medium mb-4">{doctor.specialty || "General Dentist"}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                {doctor.education && (
                  <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <FaGraduationCap /> {doctor.education}
                  </span>
                )}
                {doctor.experience && (
                  <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                    <FaBriefcaseMedical /> {doctor.experience} experience
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {doctor.bio || "This doctor has not provided a bio yet."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              Schedule & Availability
            </h3>
            <div className="flex items-start gap-3">
              <FaCalendarAlt className="text-blue-700 mt-1 shrink-0" size={18} />
              <div>
                <p className="font-medium text-slate-800">Working Days</p>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  {doctor.work_days || "Schedule not updated."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-900 text-white p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Book with Dr. {doctor.last_name || doctor.first_name}</h3>
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