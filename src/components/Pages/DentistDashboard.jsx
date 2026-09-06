import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaUserMd, FaSignOutAlt, FaClock, FaTooth, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import api from "../../utils/api";

export default function DentistDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const userFullName = localStorage.getItem("userFullName") || "Dentist";

  useEffect(() => {
    api.get("auth/me/").then(res => setProfile(res.data)).catch(console.error);
    api.get("appointments/").then(res => setAppointments(res.data)).catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`appointments/${id}/`, { status });
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
    } catch (err) {
      console.error(err);
    }
  };

  const statusColors = {
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    Completed: "bg-green-50 text-green-700 border-green-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  const pending = appointments.filter(a => a.status === "Pending");
  const confirmed = appointments.filter(a => a.status === "Confirmed");
  const completed = appointments.filter(a => a.status === "Completed");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <FaTooth className="text-2xl text-cyan-300" />
          <span className="text-xl font-bold">Bright Smile Dental</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-blue-200 text-sm hidden sm:block">Dr. {userFullName}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-lg transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Dentist Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Dr. {userFullName}!</p>
        </div>

        {/* Profile Card */}
        {profile && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex gap-6 items-center">
            <div className="w-20 h-20 rounded-2xl bg-cyan-100 flex items-center justify-center text-cyan-600 text-3xl font-bold">
              <FaUserMd />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Dr. {profile.first_name} {profile.last_name}</h2>
              <p className="text-cyan-700 font-medium">{profile.specialty || "General Dentist"}</p>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                {profile.work_days && (
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt className="text-cyan-600" /> {profile.work_days}
                  </span>
                )}
                {profile.experience && (
                  <span className="flex items-center gap-1">
                    <FaClock className="text-cyan-600" /> {profile.experience}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: appointments.length, color: "text-slate-800" },
            { label: "Pending", value: pending.length, color: "text-yellow-600" },
            { label: "Confirmed", value: confirmed.length, color: "text-blue-600" },
            { label: "Completed", value: completed.length, color: "text-green-600" },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <FaCalendarCheck className="text-cyan-600" /> My Appointments
          </h2>
          {appointments.length === 0 ? (
            <p className="text-gray-400 text-center py-12">No appointments assigned to you yet.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {appointments.map(a => (
                <div key={a.id} className="py-4 flex justify-between items-center gap-4 flex-wrap">
                  <div>
                    <p className="font-medium text-slate-900">
                      {a.patient_details ? `${a.patient_details.first_name} ${a.patient_details.last_name}` : "Patient"}
                    </p>
                    <p className="text-sm text-gray-500">{a.service_details?.name || "Service"}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{new Date(a.date_time).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full border ${statusColors[a.status] || "bg-gray-50 text-gray-600"}`}>
                      {a.status}
                    </span>
                    {a.status === "Pending" && (
                      <button
                        onClick={() => handleUpdateStatus(a.id, "Confirmed")}
                        className="text-xs bg-blue-700 text-white px-3 py-1 rounded-lg hover:bg-blue-800 transition flex items-center gap-1"
                      >
                        <FaCheckCircle /> Confirm
                      </button>
                    )}
                    {a.status === "Confirmed" && (
                      <button
                        onClick={() => handleUpdateStatus(a.id, "Completed")}
                        className="text-xs bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition flex items-center gap-1"
                      >
                        <FaCheckCircle /> Complete
                      </button>
                    )}
                    {a.status !== "Cancelled" && a.status !== "Completed" && (
                      <button
                        onClick={() => handleUpdateStatus(a.id, "Cancelled")}
                        className="text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-100 transition flex items-center gap-1"
                      >
                        <FaTimesCircle /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
