import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGraduationCap, FaBriefcaseMedical, FaEdit, FaTimes, FaPlus, FaUserTie } from "react-icons/fa";
import api from "../utils/api";

export default function AdminDoctors() {
  const [staff, setStaff] = useState([]);
  const [editingStaff, setEditingStaff] = useState(null);
  const [form, setForm] = useState({});

  const fetchStaff = async () => {
    try {
      const res = await api.get("users/");
      // Show Doctors, Dentists, and Receptionists
      const filtered = res.data.filter(u => ['Doctor', 'Dentist', 'Receptionist'].includes(u.role));
      setStaff(filtered);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleEdit = (user) => {
    setEditingStaff(user);
    setForm({ ...user, password: "" }); // Reset password field on edit
  };

  const handleCreate = () => {
    setEditingStaff({ isNew: true });
    setForm({ role: 'Doctor' }); // Default role
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (!payload.password) delete payload.password; // Don't send empty password if not changing

      if (editingStaff.isNew) {
        await api.post("users/", payload);
      } else {
        await api.put(`users/${editingStaff.id}/`, payload);
      }
      setEditingStaff(null);
      fetchStaff();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error saving staff member.");
    }
  };

  const roleColors = {
    Doctor: "bg-blue-100 text-blue-700",
    Dentist: "bg-cyan-100 text-cyan-700",
    Receptionist: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Staff Management</h1>
          <p className="text-gray-500 mt-1">
            {staff.length} staff members (Doctors, Dentists, Receptionists)
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition"
        >
          <FaPlus /> Add Staff
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col relative"
          >
            <span className={`absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${roleColors[s.role] || "bg-gray-100 text-gray-700"}`}>
              {s.role}
            </span>
            <div className="flex gap-4 items-center mb-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold uppercase shrink-0 ${roleColors[s.role] || "bg-gray-100 text-gray-700"}`}>
                {s.first_name?.[0]}{s.last_name?.[0]}
              </div>
              <div className="flex-1 min-w-0 pr-12">
                <h3 className="font-semibold text-slate-900 truncate">{s.first_name} {s.last_name}</h3>
                <p className="text-sm text-gray-500 truncate">@{s.username}</p>
              </div>
            </div>

            <div className="space-y-1 mb-4 flex-1">
              {(s.role === "Doctor" || s.role === "Dentist") && (
                <>
                  <p className="text-xs text-gray-600 flex items-center gap-2 truncate">
                    <FaUserTie className="shrink-0 text-blue-400" /> {s.specialty || "General"}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-2 truncate">
                    <FaGraduationCap className="shrink-0 text-blue-400" /> {s.education || "No education added"}
                  </p>
                  <p className="text-xs text-gray-600 flex items-center gap-2 truncate">
                    <FaBriefcaseMedical className="shrink-0 text-blue-400" /> {s.work_days || "No schedule set"}
                  </p>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleEdit(s)}
                className="flex-1 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-lg transition text-center"
              >
                Edit Profile
              </button>
              {(s.role === "Doctor" || s.role === "Dentist") && (
                <Link
                  to={`/doctors/${s.id}`}
                  className="px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition"
                  title="View public profile"
                >
                  <FaArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingStaff && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingStaff.isNew ? "Add New Staff" : `Edit ${editingStaff.role}`}
              </h2>
              <button onClick={() => setEditingStaff(null)} className="text-gray-400 hover:text-gray-600 p-2 bg-gray-100 rounded-full transition">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="bg-blue-50 p-4 rounded-xl mb-2">
                <label className="block text-sm font-medium text-blue-900 mb-1">Role</label>
                <select 
                  name="role" 
                  value={form.role || "Doctor"} 
                  onChange={handleChange} 
                  className="w-full border border-blue-200 bg-white p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={!editingStaff.isNew}
                >
                  <option value="Doctor">Doctor</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Receptionist">Receptionist</option>
                </select>
                {!editingStaff.isNew && <p className="text-xs text-blue-600 mt-1">Role cannot be changed after creation.</p>}
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input type="text" name="username" value={form.username || ""} onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingStaff.isNew ? "Password" : "New Password"}
                  </label>
                  <input 
                    type="password" 
                    name="password" 
                    value={form.password || ""} 
                    onChange={handleChange} 
                    className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
                    required={editingStaff.isNew} 
                    placeholder={editingStaff.isNew ? "" : "Leave blank to keep current"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" name="email" value={form.email || ""} onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>

              {(form.role === "Doctor" || form.role === "Dentist") && (
                <>
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
                    <textarea name="bio" value={form.bio || ""} onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" rows="3" placeholder="A short bio..."></textarea>
                  </div>
                </>
              )}
              
              <div className="pt-2">
                <button type="submit" className="w-full bg-blue-700 text-white p-3 rounded-xl font-medium hover:bg-blue-800 transition">
                  {editingStaff.isNew ? "Create Staff" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}