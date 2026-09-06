import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck, FaSignOutAlt, FaTooth, FaCalendarAlt,
  FaUser, FaCheckCircle, FaTimesCircle, FaSearch, FaPlus
} from "react-icons/fa";
import api from "../../utils/api";

export default function ReceptionistDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("appointments");

  const userFullName = localStorage.getItem("userFullName") || "Receptionist";

  useEffect(() => {
    api.get("appointments/").then(res => setAppointments(res.data)).catch(console.error);
    api.get("users/").then(res => {
      setPatients(res.data.filter(u => u.role === "Patient"));
    }).catch(console.error);
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

  const filteredAppointments = appointments.filter(a => {
    const patientName = a.patient_details
      ? `${a.patient_details.first_name} ${a.patient_details.last_name}`.toLowerCase()
      : "";
    const service = a.service_details?.name?.toLowerCase() || "";
    return patientName.includes(search.toLowerCase()) || service.includes(search.toLowerCase());
  });

  const filteredPatients = patients.filter(p =>
    `${p.first_name} ${p.last_name} ${p.username}`.toLowerCase().includes(search.toLowerCase())
  );

  const pending = appointments.filter(a => a.status === "Pending").length;
  const confirmed = appointments.filter(a => a.status === "Confirmed").length;

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

      <main className="max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Receptionist Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome, {userFullName}! Manage appointments and patients below.</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Appointments", value: appointments.length, color: "text-slate-800" },
            { label: "Pending", value: pending, color: "text-yellow-600" },
            { label: "Confirmed", value: confirmed, color: "text-blue-600" },
            { label: "Total Patients", value: patients.length, color: "text-purple-600" },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {["appointments", "patients"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium capitalize rounded-t-xl transition ${
                activeTab === tab
                  ? "bg-white border border-b-0 border-gray-200 text-blue-700"
                  : "text-gray-500 hover:text-blue-700"
              }`}
            >
              {tab === "appointments" ? <><FaCalendarCheck className="inline mr-1" /> Appointments</> : <><FaUser className="inline mr-1" /> Patients</>}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">All Appointments</h2>
            {filteredAppointments.length === 0 ? (
              <p className="text-gray-400 text-center py-12">No appointments found.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredAppointments.map(a => (
                  <div key={a.id} className="py-4 flex justify-between items-center gap-4 flex-wrap">
                    <div>
                      <p className="font-medium text-slate-900">
                        {a.patient_details
                          ? `${a.patient_details.first_name} ${a.patient_details.last_name}`
                          : "Patient"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {a.service_details?.name || "Service"} &mdash;{" "}
                        {a.dentist_details
                          ? `Dr. ${a.dentist_details.first_name} ${a.dentist_details.last_name}`
                          : "Doctor"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">{new Date(a.date_time).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
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
                      {(a.status !== "Cancelled" && a.status !== "Completed") && (
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
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">All Patients</h2>
            {filteredPatients.length === 0 ? (
              <p className="text-gray-400 text-center py-12">No patients found.</p>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredPatients.map(p => (
                  <div key={p.id} className="py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 font-bold uppercase text-sm shrink-0">
                      {p.first_name?.[0]}{p.last_name?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{p.first_name} {p.last_name}</p>
                      <p className="text-sm text-gray-500 truncate">{p.email}</p>
                    </div>
                    {p.phone_number && (
                      <span className="text-sm text-gray-500 shrink-0">{p.phone_number}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
