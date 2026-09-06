import { useState, useEffect } from "react";
import {
  FaTrash,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import api from "../utils/api";

const statusOptions = ["Pending", "Confirmed", "Completed", "Cancelled"];
const statusColors = {
  Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  Completed: "bg-green-50 text-green-700 border-green-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminBookings() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    api.get("appointments/").then(res => setAppointments(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatus = (id, status) => {
    api.patch(`appointments/${id}/`, { status }).then(fetchAppointments).catch(console.error);
  };

  const handleDelete = (id) => {
    api.delete(`appointments/${id}/`).then(fetchAppointments).catch(console.error);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>
        <p className="text-gray-500 mt-1">
          {appointments.length} appointment(s) received.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <FaCheckCircle className="text-5xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            No bookings yet. New appointment requests will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-gray-500">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Date/Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{a.patient_details?.first_name} {a.patient_details?.last_name}</p>
                    <p className="text-xs text-gray-400">
                      With Dr. {a.dentist_details?.first_name} {a.dentist_details?.last_name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="flex items-center gap-2 text-gray-600">
                      <FaPhone size={12} /> {a.patient_details?.phone_number || "N/A"}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600 mt-1">
                      <FaEnvelope size={12} /> {a.patient_details?.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{a.service_details?.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(a.date_time).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={a.status}
                      onChange={(e) => handleStatus(a.id, e.target.value)}
                      className={`border text-xs px-2 py-1.5 rounded-lg capitalize font-medium ${statusColors[a.status] || "bg-gray-50 text-gray-700"}`}
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Delete booking"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}