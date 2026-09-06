import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaSignOutAlt, FaTooth, FaCalendarAlt, FaUser } from "react-icons/fa";
import api from "../../utils/api";

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const userFullName = localStorage.getItem("userFullName") || "Patient";

  useEffect(() => {
    api.get("auth/me/").then(res => setProfile(res.data)).catch(console.error);
    api.get("appointments/").then(res => setAppointments(res.data)).catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const statusColors = {
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    Completed: "bg-green-50 text-green-700 border-green-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <FaTooth className="text-2xl text-cyan-300" />
          <span className="text-xl font-bold">Bright Smile Dental</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-blue-200 text-sm hidden sm:block">{userFullName}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-1.5 rounded-lg transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {userFullName}!</p>
        </div>

        {/* Profile Card */}
        {profile && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex gap-6 items-center">
            <div className="w-20 h-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-500 text-3xl">
              <FaUser />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{profile.first_name} {profile.last_name}</h2>
              <p className="text-blue-700 font-medium capitalize">{profile.role}</p>
              <p className="text-sm text-gray-500 mt-1">{profile.email}</p>
              {profile.phone_number && <p className="text-sm text-gray-500">{profile.phone_number}</p>}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <Link
            to="/booking"
            className="bg-blue-700 text-white rounded-2xl p-6 flex items-center gap-4 hover:bg-blue-800 transition shadow-sm"
          >
            <FaCalendarAlt className="text-3xl text-cyan-300" />
            <div>
              <p className="font-semibold text-lg">Book Appointment</p>
              <p className="text-blue-200 text-sm">Schedule a visit with our doctors</p>
            </div>
          </Link>
          <div className="bg-white rounded-2xl p-6 flex items-center gap-4 border border-gray-100 shadow-sm">
            <FaCalendarCheck className="text-3xl text-green-500" />
            <div>
              <p className="text-3xl font-bold text-slate-900">{appointments.length}</p>
              <p className="text-gray-500 text-sm">Total Appointments</p>
            </div>
          </div>
        </div>

        {/* Appointment History */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <FaCalendarCheck className="text-blue-700" /> My Appointments
          </h2>
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">You have no appointments yet.</p>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-6 py-2.5 rounded-xl hover:bg-blue-800 transition"
              >
                <FaCalendarAlt /> Book Now
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {appointments.map(a => (
                <div key={a.id} className="py-4 flex justify-between items-center gap-4">
                  <div>
                    <p className="font-medium text-slate-900">{a.service_details?.name || "Service"}</p>
                    <p className="text-sm text-gray-500">
                      {a.dentist_details ? `Dr. ${a.dentist_details.first_name} ${a.dentist_details.last_name}` : "Doctor"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{new Date(a.date_time).toLocaleString()}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full border capitalize ${statusColors[a.status] || "bg-gray-50 text-gray-600"}`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
