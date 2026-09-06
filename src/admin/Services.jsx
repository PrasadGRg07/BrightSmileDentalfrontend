import { Link } from "react-router-dom";
import { FaArrowRight, FaTooth } from "react-icons/fa";
import { services, allServices } from "../data/services";

export default function AdminServices() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Services</h1>
        <p className="text-gray-500 mt-1">
          {services.length} featured services currently shown on the website.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl mb-3">
              <s.icon />
            </div>
            <h3 className="font-semibold text-slate-900">{s.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          All Treatments Offered
        </h2>
        <div className="flex flex-wrap gap-2">
          {allServices.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 px-3 py-1.5 rounded-full text-sm"
            >
              <FaTooth size={12} /> {s}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-blue-900 text-white rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg">Edit services list?</h3>
          <p className="text-blue-200 text-sm">
            Service data is managed in the codebase at src/data/services.js
          </p>
        </div>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-cyan-400 text-blue-950 font-medium px-5 py-2.5 rounded-xl hover:bg-cyan-300 transition"
        >
          View on site <FaArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}