import { useState } from "react";
import { FaTrash, FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { getMessages, markMessageRead, deleteMessage } from "../utils/store";

export default function AdminMessages() {
  const [messages, setMessages] = useState(getMessages);

  const handleMarkRead = (id) => {
    markMessageRead(id);
    setMessages(getMessages());
  };

  const handleDelete = (id) => {
    deleteMessage(id);
    setMessages(getMessages());
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
        <p className="text-gray-500 mt-1">
          {messages.length} message(s), {unread} unread.
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <FaEnvelope className="text-5xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            No messages yet. Contact form submissions will appear here.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`bg-white rounded-2xl shadow-sm border p-6 ${
                m.read ? "border-gray-100" : "border-blue-200 bg-blue-50/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-semibold text-slate-900">{m.name}</h3>
                    {!m.read && (
                      <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {m.email} · {new Date(m.createdAt).toLocaleString()}
                  </p>
                  <p className="font-medium text-blue-900 mt-2">{m.subject}</p>
                  <p className="text-gray-600 mt-1">{m.message}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  {!m.read && (
                    <button
                      onClick={() => handleMarkRead(m.id)}
                      className="inline-flex items-center gap-2 border border-blue-600 text-blue-700 px-3 py-1.5 rounded-lg text-xs hover:bg-blue-50 transition"
                    >
                      <FaCheckCircle /> Mark read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="inline-flex items-center gap-2 text-red-500 hover:text-red-700 text-xs transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}