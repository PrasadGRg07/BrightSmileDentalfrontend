import { useState, useEffect } from "react";
import { FaTooth, FaEdit, FaTimes, FaPlus } from "react-icons/fa";
import api from "../utils/api";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [form, setForm] = useState({});

  const fetchServices = async () => {
    try {
      const res = await api.get("services/");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (service) => {
    setEditingService(service);
    setForm(service);
  };

  const handleCreate = () => {
    setEditingService({ isNew: true });
    setForm({ duration_minutes: 30 }); // Default duration
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService.isNew) {
        await api.post("services/", form);
      } else {
        await api.put(`services/${editingService.id}/`, form);
      }
      setEditingService(null);
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Error saving service.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Services</h1>
          <p className="text-gray-500 mt-1">
            {services.length} services currently offered.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition"
        >
          <FaPlus /> Add Service
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-2xl">
                <FaTooth />
              </div>
              <button
                onClick={() => handleEdit(s)}
                className="text-blue-700 hover:text-blue-900 p-2 bg-blue-50 rounded-lg"
                title="Edit Service"
              >
                <FaEdit />
              </button>
            </div>
            <h3 className="font-semibold text-slate-900">{s.name}</h3>
            <p className="text-sm text-gray-500 mt-1 flex-1">{s.description || "No description provided."}</p>
            <div className="mt-4 flex items-center justify-between border-t pt-3 border-gray-100">
              <span className="text-blue-700 font-bold">Rs. {Number(s.price).toLocaleString()}</span>
              <span className="text-gray-400 text-sm">{s.duration_minutes} mins</span>
            </div>
          </div>
        ))}
      </div>

      {editingService && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {editingService.isNew ? "Add New Service" : "Edit Service"}
              </h2>
              <button onClick={() => setEditingService(null)} className="text-gray-400 hover:text-gray-600 p-2 bg-gray-100 rounded-full transition">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                <input type="text" name="name" value={form.name || ""} onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input type="number" step="0.01" name="price" value={form.price || ""} onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Mins)</label>
                  <input type="number" name="duration_minutes" value={form.duration_minutes || ""} onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea name="description" value={form.description || ""} onChange={handleChange} className="w-full border border-gray-200 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" rows="3"></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-blue-700 text-white p-3 rounded-xl font-medium hover:bg-blue-800 transition">
                  {editingService.isNew ? "Create Service" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}