import { useState } from "react";
import {
  FaTrash,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import {
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../utils/store";

const statusOptions = ["pending", "confirmed", "completed"];
const statusColors = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
};

export default function AdminBookings() {
  const [appointments, setAppointments] = useState(getAppointments);

  const handleStatus = (id, status) => {
    updateAppointmentStatus(id, status);
    setAppointments(getAppointments());
  };

  const handleDelete = (id) => {
    deleteAppointment(id);
    setAppointments(getAppointments());
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>
        <p className="text-gray-500 mt-1">
          {appointments.length} appointment(s) received from the website.
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
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">{a.name}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="flex items-center gap-2 text-gray-600">
                      <FaPhone size={12} /> {a.phone}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600 mt-1">
                      <FaEnvelope size={12} /> {a.email}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{a.service}</td>
                  <td className="px-6 py-4 text-gray-600">{a.date}</td>
                  <td className="px-6 py-4 text-gray-600">{a.time}</td>
                  <td className="px-6 py-4">
                    <select
                      value={a.status}
                      onChange={(e) => handleStatus(a.id, e.target.value)}
                      className={`border text-xs px-2 py-1.5 rounded-lg capitalize font-medium ${statusColors[a.status]}`}
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