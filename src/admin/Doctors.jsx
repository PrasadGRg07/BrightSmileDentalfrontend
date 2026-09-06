import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGraduationCap, FaBriefcaseMedical, FaEdit, FaTimes } from "react-icons/fa";
import api from "../utils/api";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [form, setForm] = useState({});

  const fetchDoctors = async () => {
    try {
      const res = await api.get("users/?role=Doctor");
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setForm(doctor);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`users/${editingDoctor.id}/`, form);
      setEditingDoctor(null);
      fetchDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Doctors</h1>
          <p className="text-gray-500 mt-1">
            {doctors.length} doctors displayed on the website.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {doctors.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4 items-center"
          >
            <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500 text-2xl font-bold uppercase shrink-0">
              {d.first_name?.[0]}{d.last_name?.[0]}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate">{d.first_name} {d.last_name}</h3>
              <p className="text-sm text-blue-700 truncate">{d.specialty || "No specialty"}</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1 truncate">
                <FaGraduationCap className="shrink-0" /> {d.education || "No education added"}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-1 truncate">
                <FaBriefcaseMedical className="shrink-0" /> {d.work_days || "No schedule set"}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleEdit(d)}
                className="text-blue-700 hover:text-blue-900 p-2 bg-blue-50 rounded-lg"
                title="Edit Profile"
              >
                <FaEdit />
              </button>
              <Link
                to={`/doctors/${d.id}`}
                className="text-blue-700 hover:text-blue-900 p-2 bg-blue-50 rounded-lg"
                title="View profile"
              >
                <FaArrowRight />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {editingDoctor && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Edit Doctor Profile</h2>
              <button onClick={() => setEditingDoctor(null)} className="text-gray-400 hover:text-gray-600 p-2 bg-gray-100 rounded-full transition">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" name="first_name" value={form.first_name || ""} onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" name="last_name" value={form.last_name || ""} onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                <input type="text" name="specialty" value={form.specialty || ""} placeholder="e.g. Orthodontist" onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                <input type="text" name="education" value={form.education || ""} placeholder="e.g. BDS, MDS" onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <input type="text" name="experience" value={form.experience || ""} placeholder="e.g. 10 Years" onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Days (Schedule)</label>
                <input type="text" name="work_days" value={form.work_days || ""} placeholder="e.g. Sunday, Monday, Wednesday" onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea name="bio" value={form.bio || ""} onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" rows="3" placeholder="A short bio about the doctor..."></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-blue-700 text-white p-3 rounded-xl font-medium hover:bg-blue-800 transition">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}