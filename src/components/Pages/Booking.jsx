import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import api from "../../utils/api";

function Booking() {
  const [services, setServices] = useState([]);
  const [dentists, setDentists] = useState([]);
  const [form, setForm] = useState({
    dentist: "",
    service: "",
    date: "",
    time: "",
    notes: ""
  });
  const [booked, setBooked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Services
    api.get("services/")
      .then(res => setServices(res.data))
      .catch(console.error);

    // Fetch Dentists
    api.get("users/?role=Dentist")
      .then(res => setDentists(res.data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!localStorage.getItem("accessToken")) {
      setError("Please log in to book an appointment.");
      return;
    }

    try {
      const dateTime = new Date(`${form.date}T${form.time}`).toISOString();
      await api.post("appointments/", {
        dentist: form.dentist,
        service: form.service,
        date_time: dateTime,
        notes: form.notes
      });
      
      setBooked(true);
      setForm({ dentist: "", service: "", date: "", time: "", notes: "" });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to book appointment. Please try again.");
    }
  };

  const inputClass =
    "w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="bg-gray-50 text-gray-800">
      <section className="bg-gradient-to-r from-blue-900 to-cyan-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">
            Schedule your visit with Bright Smile Dental. We'll confirm your
            appointment as soon as possible.
          </p>
        </div>
      </section>

      <section className="max-w-xl mx-auto px-4 py-16">
        <div className="p-6 bg-white shadow-lg rounded-2xl border border-gray-100">
          {booked && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-xl mb-4">
              <FaCheckCircle /> Appointment booked successfully! We'll be in touch.
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-xl mb-4">
              {error}
              {error.includes("log in") && (
                <button onClick={() => navigate("/login")} className="ml-auto underline font-bold">
                  Login
                </button>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              name="service"
              required
              className={inputClass}
              onChange={handleChange}
              value={form.service}
            >
              <option value="">Select Service</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name} (${s.price})</option>
              ))}
            </select>

            <select
              name="dentist"
              required
              className={inputClass}
              onChange={handleChange}
              value={form.dentist}
            >
              <option value="">Select Dentist</option>
              {dentists.map(d => (
                <option key={d.id} value={d.id}>Dr. {d.first_name} {d.last_name}</option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              required
              className={inputClass}
              onChange={handleChange}
              value={form.date}
            />

            <select
              name="time"
              required
              className={inputClass}
              onChange={handleChange}
              value={form.time}
            >
              <option value="">Select Time</option>
              <option value="10:00:00">10:00 AM</option>
              <option value="11:00:00">11:00 AM</option>
              <option value="12:00:00">12:00 PM</option>
              <option value="14:00:00">2:00 PM</option>
              <option value="15:00:00">3:00 PM</option>
              <option value="16:00:00">4:00 PM</option>
            </select>
            
            <textarea
              name="notes"
              placeholder="Any additional notes?"
              className={inputClass}
              onChange={handleChange}
              value={form.notes}
              rows="3"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white p-3 rounded-xl hover:bg-blue-800 transition"
            >
              Book Appointment
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Booking;
