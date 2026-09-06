import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck, FaSignOutAlt, FaTooth, FaPhone, FaEnvelope,
  FaUserMd, FaSearch, FaCheckCircle, FaExclamationTriangle,
  FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaUser
} from "react-icons/fa";
import api from "../../utils/api";

export default function ReceptionistDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("appointments");
  const [flagModal, setFlagModal] = useState(null); // appointment being flagged
  const [flagNote, setFlagNote] = useState("");

  const userFullName = localStorage.getItem("userFullName") || "Receptionist";

  const fetchAppointments = () => {
    api.get("appointments/").then(res => setAppointments(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchAppointments();
    api.get("users/").then(res => {
      setPatients(res.data.filter(u => u.role === "Patient"));
    }).catch(console.error);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  const handleConfirm = async (id) => {
    await api.patch(`appointments/${id}/`, { status: "Confirmed" }).catch(console.error);
    fetchAppointments();
  };

  const handleFlagReschedule = async () => {
    await api.patch(`appointments/${flagModal.id}/`, {
      status: "Needs_Reschedule",
      receptionist_note: flagNote,
    }).catch(console.error);
    setFlagModal(null);
    setFlagNote("");
    fetchAppointments();
  };

  const statusColors = {
    Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
    Needs_Reschedule: "bg-orange-50 text-orange-700 border-orange-200",
    Completed: "bg-green-50 text-green-700 border-green-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
  };

  const filteredAppointments = appointments.filter(a => {
    const name = (a.patient_name || `${a.patient_details?.first_name || ""} ${a.patient_details?.last_name || ""}`).toLowerCase();
    const doctor = `${a.dentist_details?.first_name || ""} ${a.dentist_details?.last_name || ""}`.toLowerCase();
    return name.includes(search.toLowerCase()) || doctor.includes(search.toLowerCase());
  });

  const filteredPatients = patients.filter(p =>
    `${p.first_name} ${p.last_name} ${p.username}`.toLowerCase().includes(search.toLowerCase())
  );

  const pending = appointments.filter(a => a.status === "Pending").length;
  const needsReschedule = appointments.filter(a => a.status === "Needs_Reschedule").length;

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
          <p className="text-gray-500 mt-1">Welcome, {userFullName}! Review and process patient appointments.</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: appointments.length, color: "text-slate-800" },
            { label: "Pending Action", value: pending, color: "text-yellow-600" },
            { label: "Confirmed", value: appointments.filter(a => a.status === "Confirmed").length, color: "text-blue-600" },
            { label: "Patients", value: patients.length, color: "text-purple-600" },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Needs Reschedule Alert */}
        {needsReschedule > 0 && (
          <div className="mb-6 bg-orange-50 border border-orange-200 rounded-2xl px-5 py-4 flex items-start gap-3">
            <FaExclamationTriangle className="text-orange-500 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-orange-800">{needsReschedule} appointment(s) awaiting admin reschedule</p>
              <p className="text-sm text-orange-600 mt-0.5">You have flagged these for the admin to change the doctor or date. Follow up as needed.</p>
            </div>
          </div>
        )}

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
              {tab === "appointments"
                ? <><FaCalendarCheck className="inline mr-1" /> Appointments</>
                : <><FaUser className="inline mr-1" /> Patients</>
              }
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
          <div className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <p className="text-gray-400">No appointments found.</p>
              </div>
            ) : filteredAppointments.map(a => {
              const patientName = a.patient_name || `${a.patient_details?.first_name || ""} ${a.patient_details?.last_name || ""}`.trim() || "Unknown";
              const doctorName = a.dentist_details
                ? `Dr. ${a.dentist_details.first_name} ${a.dentist_details.last_name}`
                : "No doctor assigned";
              const phone = a.patient_phone || a.patient_details?.phone_number;
              const email = a.patient_email || a.patient_details?.email;

              return (
                <div key={a.id} className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${
                  a.status === "Needs_Reschedule" ? "border-orange-200" : "border-gray-100"
                }`}>
                  {/* Top bar */}
                  <div className={`flex items-center justify-between px-5 py-3 border-b ${
                    a.status === "Needs_Reschedule" ? "bg-orange-50 border-orange-100" : "bg-gray-50 border-gray-100"
                  }`}>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-3 py-1 rounded-full border font-medium ${statusColors[a.status] || "bg-gray-50 text-gray-600"}`}>
                        {a.status === "Needs_Reschedule" ? "⏳ Needs Reschedule (Admin)" : a.status}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FaCalendarAlt size={11} />
                        {new Date(a.date_time).toLocaleString("en-NP", { dateStyle: "medium", timeStyle: "short" })}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 grid sm:grid-cols-3 gap-5">
                    {/* Patient Info */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Patient</p>
                      <p className="font-semibold text-slate-900">{patientName}</p>
                      {a.patient_address && (
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <FaMapMarkerAlt className="shrink-0" /> {a.patient_address}
                        </p>
                      )}
                      <div className="mt-2 space-y-1">
                        {phone && (
                          <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-blue-700 hover:underline font-medium">
                            <FaPhone size={12} /> {phone}
                          </a>
                        )}
                        {email && (
                          <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-blue-700 hover:underline">
                            <FaEnvelope size={12} /> {email}
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Doctor & Service */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Doctor & Service</p>
                      <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                        <FaUserMd className="text-blue-600" /> {doctorName}
                      </p>
                      {a.dentist_details?.specialty && (
                        <p className="text-xs text-gray-400 ml-5">{a.dentist_details.specialty}</p>
                      )}
                      {a.dentist_details?.work_days && (
                        <p className="text-xs text-gray-400 ml-5">Works: {a.dentist_details.work_days}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">{a.service_details?.name}</p>
                      {a.notes && <p className="text-xs text-gray-400 italic mt-1">"{a.notes}"</p>}
                      {a.receptionist_note && (
                        <p className="text-xs text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-3 py-1.5 mt-2">
                          📝 Note to Admin: {a.receptionist_note}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Actions</p>
                      {a.status === "Pending" && (
                        <div className="space-y-2">
                          <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                            📞 Call patient to confirm doctor availability before confirming.
                          </p>
                          <button
                            onClick={() => handleConfirm(a.id)}
                            className="w-full text-sm bg-blue-700 text-white py-2.5 rounded-xl hover:bg-blue-800 transition font-medium"
                          >
                            ✅ Confirm Appointment
                          </button>
                          <button
                            onClick={() => { setFlagModal(a); setFlagNote(""); }}
                            className="w-full text-sm bg-orange-50 text-orange-700 border border-orange-200 py-2.5 rounded-xl hover:bg-orange-100 transition"
                          >
                            🔄 Request Reschedule (Notify Admin)
                          </button>
                        </div>
                      )}
                      {a.status === "Confirmed" && (
                        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                          ✅ Appointment confirmed. No further action needed.
                        </p>
                      )}
                      {a.status === "Needs_Reschedule" && (
                        <p className="text-sm text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                          ⏳ Waiting for admin to reschedule. Keep patient informed.
                        </p>
                      )}
                      {a.status === "Completed" && (
                        <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                          ✔ Appointment completed.
                        </p>
                      )}
                      {a.status === "Cancelled" && (
                        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                          ✕ Appointment cancelled.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
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
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500 font-bold text-sm shrink-0">
                      {p.first_name?.[0]}{p.last_name?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">{p.first_name} {p.last_name}</p>
                      <p className="text-sm text-gray-500 truncate">{p.email}</p>
                    </div>
                    {p.phone_number && (
                      <a href={`tel:${p.phone_number}`} className="text-sm text-blue-700 hover:underline shrink-0 flex items-center gap-1">
                        <FaPhone size={12} /> {p.phone_number}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Flag for Reschedule Modal */}
      {flagModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">Request Reschedule</h2>
              <button onClick={() => setFlagModal(null)} className="text-gray-400 hover:text-gray-600 p-2 bg-gray-100 rounded-full">
                <FaTimes />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              This will notify the <span className="font-semibold text-blue-700">Admin</span> that this appointment needs to be rescheduled.
              The admin will change the doctor or date and reset the booking.
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-4">
              <p className="font-medium text-blue-900 text-sm">Patient: {flagModal.patient_name || "—"}</p>
              <p className="text-sm text-blue-700 mt-0.5">Dr. {flagModal.dentist_details?.first_name} {flagModal.dentist_details?.last_name}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason / Note for Admin <span className="text-red-500">*</span></label>
              <textarea
                value={flagNote}
                onChange={e => setFlagNote(e.target.value)}
                rows="3"
                placeholder="e.g. Patient confirmed but Dr. Smith is unavailable on this date. Please assign another doctor or change to Thursday."
                className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
              ></textarea>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setFlagModal(null)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl hover:bg-gray-50 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleFlagReschedule}
                disabled={!flagNote.trim()}
                className="flex-1 bg-orange-600 text-white py-2.5 rounded-xl hover:bg-orange-700 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Notify Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
