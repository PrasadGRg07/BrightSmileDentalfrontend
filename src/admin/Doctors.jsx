import { Link } from "react-router-dom";
import { FaArrowRight, FaGraduationCap, FaBriefcaseMedical } from "react-icons/fa";
import { doctors } from "../data/doctors";

export default function AdminDoctors() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Doctors</h1>
        <p className="text-gray-500 mt-1">
          {doctors.length} doctors displayed on the website.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {doctors.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-center"
          >
            <img
              src={d.image}
              alt={d.name}
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{d.name}</h3>
              <p className="text-sm text-blue-700">{d.specialty}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <FaGraduationCap /> {d.education}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FaBriefcaseMedical /> {d.experience}
              </p>
            </div>
            <Link
              to={`/doctors/${d.id}`}
              className="text-blue-700 hover:text-blue-900"
              title="View profile"
            >
              <FaArrowRight />
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-purple-900 text-white rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">Manage doctor profiles?</h3>
          <p className="text-purple-200 text-sm">
            Doctor data is managed in the codebase at src/data/doctors.js
          </p>
        </div>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 bg-white text-purple-900 font-medium px-5 py-2.5 rounded-xl hover:bg-purple-50 transition"
        >
          View on site <FaArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}