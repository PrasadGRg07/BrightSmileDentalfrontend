import { useState, useEffect } from "react";
import {
  FaTrash, FaCheckCircle, FaPhone, FaEnvelope, FaEdit,
  FaTimes, FaUserMd, FaCalendarAlt, FaClock, FaMapMarkerAlt,
  FaExclamationTriangle, FaSearch
} from "react-icons/fa";
import api from "../utils/api";

const statusColors = {
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminBookings() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [editingAppt, setEditingAppt] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchAll = () => {
    api.get("appointments/").then(res => setAppointments(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchAll();
    Promise.all([
      api.get("users/?role=Doctor"),
      api.get("users/?role=Dentist"),
    ]).then(([d, de]) => setDoctors([...d.data, ...de.data])).catch(console.error);
    api.get("services/").then(res => setServices(res.data)).catch(console.error);
  }, []);

  const handleStatus = (id, status) => {
    api.patch(`appointments/${id}/`, { status }).then(fetchAll).catch(console.error);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    api.delete(`appointments/${id}/`).then(fetchAll).catch(console.error);
  };

  const openEdit = (appt) => {
    setEditingAppt(appt);
    const dt = new Date(appt.date_time);
    setEditForm({
      dentist: appt.dentist,
      service: appt.service,
      date: dt.toISOString().split("T")[0],
      time: dt.toTimeString().slice(0, 8),
      notes: appt.notes || "",
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const dateTime = new Date(`${editForm.date}T${editForm.time}`).toISOString();
      await api.patch(`appointments/${editingAppt.id}/`, {
        dentist: editForm.dentist,
        service: editForm.service,
        date_time: dateTime,
        notes: editForm.notes,
        status: "Pending", // Reset to pending after reschedule
      });
      setEditingAppt(null);
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to update appointment.");
    }
  };

  const filtered = appointments
    .filter(a => {
      const q = search.toLowerCase();
      const name = (a.patient_name || `${a.patient_details?.first_name} ${a.patient_details?.last_name}`).toLowerCase();
      const doctor = `${a.dentist_details?.first_name} ${a.dentist_details?.last_name}`.toLowerCase();
      return name.includes(q) || doctor.includes(q);
    })
    .filter(a => filterStatus === "All" || a.status === filterStatus);

  const pending = appointments.filter(a => a.status === "Pending").length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>
          <p className="text-gray-500 mt-1">
            {appointments.length} appointment(s) total
            {pending > 0 && (
              <span className="ml-2 text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded-full text-xs font-medium">
                {pending} pending
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13} />
          <input
            type="text"
            placeholder="Search patient or doctor..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition ${
                filterStatus === s
                  ? "bg-blue-700 text-white border-blue-700"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <FaCheckCircle className="text-5xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No appointments found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((a) => {
            const patientName = a.patient_name || `${a.patient_details?.first_name || ""} ${a.patient_details?.last_name || ""}`.trim() || "Unknown";
            const doctorName = a.dentist_details
              ? `Dr. ${a.dentist_details.first_name} ${a.dentist_details.last_name}`
              : "No doctor assigned";
            const phone = a.patient_phone || a.patient_details?.phone_number;
            const email = a.patient_email || a.patient_details?.email;

            return (
              <div key={a.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Top bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${statusColors[a.status] || "bg-gray-50 text-gray-600"}`}>
                      {a.status}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <FaCalendarAlt size={11} />
                      {new Date(a.date_time).toLocaleString("en-NP", {
                        dateStyle: "medium", timeStyle: "short"
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(a)}
                      className="flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
                      title="Edit / Reschedule"
                    >
                      <FaEdit size={11} /> Edit / Reschedule
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-400 hover:text-red-600 p-1.5 bg-red-50 rounded-lg border border-red-100 transition"
                      title="Delete booking"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 grid sm:grid-cols-3 gap-5">
                  {/* Patient Info */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Patient</p>
                    <p className="font-semibold text-slate-900 text-base">{patientName}</p>
                    {a.patient_address && (
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <FaMapMarkerAlt className="shrink-0" /> {a.patient_address}
                      </p>
                    )}
                    <div className="mt-2 space-y-1">
                      {phone && (
                        <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-blue-700 hover:underline">
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
                      <p className="text-xs text-gray-500 mt-0.5 ml-5">{a.dentist_details.specialty}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-2">{a.service_details?.name || "Service"}</p>
                    {a.service_details?.price && (
                      <p className="text-xs text-blue-700 font-medium">Rs. {Number(a.service_details.price).toLocaleString()}</p>
                    )}
                    {a.notes && (
                      <p className="text-xs text-gray-400 mt-2 italic">"{a.notes}"</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Actions</p>
                    <div className="space-y-2">
                      {a.status === "Pending" && (
                        <>
                          <p className="text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 flex items-start gap-1.5">
                            <FaExclamationTriangle className="shrink-0 mt-0.5" />
                            Contact patient to confirm doctor availability.
                          </p>
                          <button
                            onClick={() => handleStatus(a.id, "Confirmed")}
                            className="w-full text-sm bg-blue-700 text-white py-2 rounded-xl hover:bg-blue-800 transition font-medium"
                          >
                            ✅ Confirm Appointment
                          </button>
                          <button
                            onClick={() => openEdit(a)}
                            className="w-full text-sm bg-orange-50 text-orange-700 border border-orange-200 py-2 rounded-xl hover:bg-orange-100 transition"
                          >
                            🔄 Reschedule / Change Doctor
                          </button>
                        </>
                      )}
                      {a.status === "Confirmed" && (
                        <button
                          onClick={() => handleStatus(a.id, "Completed")}
                          className="w-full text-sm bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition font-medium"
                        >
                          ✔ Mark as Completed
                        </button>
                      )}
                      {(a.status !== "Cancelled" && a.status !== "Completed") && (
                        <button
                          onClick={() => handleStatus(a.id, "Cancelled")}
                          className="w-full text-sm bg-red-50 text-red-600 border border-red-200 py-2 rounded-xl hover:bg-red-100 transition"
                        >
                          ✕ Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit / Reschedule Modal */}
      {editingAppt && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Reschedule Appointment</h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  Change the doctor, date, or time. Patient status will reset to <span className="font-medium text-yellow-700">Pending</span>.
                </p>
              </div>
              <button onClick={() => setEditingAppt(null)} className="text-gray-400 hover:text-gray-600 p-2 bg-gray-100 rounded-full">
                <FaTimes />
              </button>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-5 text-sm">
              <p className="font-medium text-blue-900">
                Patient: {editingAppt.patient_name || `${editingAppt.patient_details?.first_name} ${editingAppt.patient_details?.last_name}`}
              </p>
              {(editingAppt.patient_phone || editingAppt.patient_details?.phone_number) && (
                <a href={`tel:${editingAppt.patient_phone || editingAppt.patient_details?.phone_number}`}
                  className="flex items-center gap-1.5 text-blue-700 mt-1 hover:underline">
                  <FaPhone size={12} /> {editingAppt.patient_phone || editingAppt.patient_details?.phone_number}
                </a>
              )}
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor / Dentist</label>
                <select
                  value={editForm.dentist}
                  onChange={e => setEditForm({ ...editForm, dentist: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  <option value="">-- Select Doctor --</option>
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>
                      Dr. {d.first_name} {d.last_name}{d.specialty ? ` — ${d.specialty}` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                <select
                  value={editForm.service}
                  onChange={e => setEditForm({ ...editForm, service: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaCalendarAlt size={12} /> Date</label>
                  <input
                    type="date"
                    value={editForm.date}
                    onChange={e => setEditForm({ ...editForm, date: e.target.value })}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FaClock size={12} /> Time</label>
                  <select
                    value={editForm.time}
                    onChange={e => setEditForm({ ...editForm, time: e.target.value })}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    required
                  >
                    <option value="09:00:00">9:00 AM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="11:00:00">11:00 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="14:00:00">2:00 PM</option>
                    <option value="15:00:00">3:00 PM</option>
                    <option value="16:00:00">4:00 PM</option>
                    <option value="17:00:00">5:00 PM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={editForm.notes}
                  onChange={e => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows="2"
                  placeholder="Add a note about the reschedule reason..."
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-700 text-white py-3 rounded-xl font-medium hover:bg-blue-800 transition">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}