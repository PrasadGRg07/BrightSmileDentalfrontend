import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaUserMd, FaGraduationCap } from "react-icons/fa";
import api from "../../utils/api";

export default function DoctorsSection({ title = "Our Doctors", subtitle }) {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get("users/?role=Doctor").then(res => {
      setDoctors(res.data);
    }).catch(console.error);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900">{title}</h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          {subtitle ||
            "Meet the experienced dental professionals dedicated to your oral health."}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctors.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col text-center"
          >
            <div className="aspect-square bg-blue-50 overflow-hidden flex items-center justify-center text-4xl text-blue-300">
              <FaUserMd className="w-full h-full p-8 opacity-20" />
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="w-10 h-10 mx-auto -mt-10 rounded-full bg-blue-700 text-white flex items-center justify-center shadow-md">
                <FaUserMd size={18} />
              </div>
              <h3 className="font-semibold text-lg text-blue-900 mt-2">{d.first_name} {d.last_name}</h3>
              <p className="text-blue-600 text-sm font-medium">{d.specialty || "General Dentist"}</p>
              <p className="text-gray-500 text-sm mt-2 flex items-center justify-center gap-1">
                <FaGraduationCap /> {d.experience || "Experienced"}
              </p>
              <Link
                to={`/doctors/${d.id}`}
                className="mt-4 inline-flex items-center justify-center gap-2 border border-blue-700 text-blue-700 font-medium px-4 py-2 rounded-xl hover:bg-blue-50 transition"
              >
                View Detail <FaArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}