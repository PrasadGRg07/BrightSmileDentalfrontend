import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaEnvelope,
  FaTooth,
  FaUserMd,
  FaArrowRight,
} from "react-icons/fa";
import { getAppointments, getMessages } from "../utils/store";
import { services } from "../data/services";
import { doctors } from "../data/doctors";

const statusColors = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-blue-50 text-blue-700 border-blue-200",
  completed: "bg-green-50 text-green-700 border-green-200",
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [appointments] = useState(getAppointments);
  const [messages] = useState(getMessages);

  const stats = [
    {
      label: "Total Bookings",
      value: appointments.length,
      icon: FaCalendarCheck,
      to: "/admin/bookings",
      color: "bg-blue-600",
    },
    {
      label: "Messages",
      value: messages.length,
      icon: FaEnvelope,
      to: "/admin/messages",
      color: "bg-cyan-600",
    },
    {
      label: "Services",
      value: services.length,
      icon: FaTooth,
      to: "/admin/services",
      color: "bg-emerald-600",
    },
    {
      label: "Doctors",
      value: doctors.length,
      icon: FaUserMd,
      to: "/admin/doctors",
      color: "bg-purple-600",
    },
  ];

  const pendingCount = appointments.filter((a) => a.status === "pending").length;
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your dental clinic activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <button
            key={s.label}
            onClick={() => navigate(s.to)}
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition text-left"
          >
            <div className={`w-12 h-12 rounded-xl ${s.color} text-white flex items-center justify-center text-2xl mb-4`}>
              <s.icon />
            </div>
            <p className="text-3xl font-bold text-slate-900">{s.value}</p>
            <p className="text-gray-500 text-sm">{s.label}</p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent appointments */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Bookings</h2>
            {pendingCount > 0 && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                {pendingCount} pending
              </span>
            )}
          </div>
          {appointments.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">
              No appointments yet. Bookings from the website will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {appointments.slice(0, 5).map((a) => (
                <li key={a.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-900">{a.name}</p>
                    <p className="text-sm text-gray-500">{a.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{a.date}</p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border capitalize ${statusColors[a.status]}`}
                    >
                      {a.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/admin/bookings"
            className="mt-4 inline-flex items-center gap-2 text-blue-700 font-medium text-sm hover:underline"
          >
            View all <FaArrowRight size={12} />
          </Link>
        </div>

        {/* Recent messages */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">Recent Messages</h2>
            {unreadCount > 0 && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                {unreadCount} unread
              </span>
            )}
          </div>
          {messages.length === 0 ? (
            <p className="text-gray-500 text-sm py-8 text-center">
              No messages yet. Contact form submissions will appear here.
            </p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {messages.slice(0, 5).map((m) => (
                <li key={m.id} className="py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-900 flex items-center gap-2">
                      {m.name}
                      {!m.read && (
                        <span className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </p>
                    <p className="text-xs text-gray-400">{m.subject}</p>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{m.message}</p>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/admin/messages"
            className="mt-4 inline-flex items-center gap-2 text-blue-700 font-medium text-sm hover:underline"
          >
            View all <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}