import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import api from "../../utils/api";

function Booking() {
  const [services, setServices] = useState([]);
  const [dentists, setDentists] = useState([]);
  const [form, setForm] = useState({
    patient_name: "",
    patient_phone: "",
    patient_email: "",
    patient_address: "",
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
    api.get("services/")
      .then(res => setServices(res.data))
      .catch(console.error);

    Promise.all([
      api.get("users/?role=Doctor"),
      api.get("users/?role=Dentist")
    ]).then(([docRes, dentRes]) => {
      setDentists([...docRes.data, ...dentRes.data]);
    }).catch(console.error);

    // Pre-fill if user is logged in
    const name = localStorage.getItem("userFullName");
    if (name) setForm(f => ({ ...f, patient_name: name }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        notes: form.notes,
        patient_name: form.patient_name,
        patient_phone: form.patient_phone,
        patient_email: form.patient_email,
        patient_address: form.patient_address,
      });

      setBooked(true);
      setForm({
        patient_name: "", patient_phone: "", patient_email: "",
        patient_address: "", dentist: "", service: "", date: "", time: "", notes: ""
      });
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to book appointment. Please try again.");
    }
  };

  const inputClass =
    "w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white";

  const Label = ({ icon: Icon, text, optional }) => (
    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
      <Icon className="text-blue-600" size={13} />
      {text}
      {optional && <span className="text-gray-400 font-normal">(optional)</span>}
    </label>
  );

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

      <section className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">

          {/* Form Header */}
          <div className="bg-blue-50 border-b border-blue-100 px-6 py-4">
            <h2 className="text-lg font-bold text-blue-900">Appointment Details</h2>
            <p className="text-sm text-blue-600 mt-0.5">Fill in your information and preferred slot.</p>
          </div>

          <div className="p-6 space-y-6">
            {booked && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-3 rounded-xl">
                <FaCheckCircle /> Appointment booked successfully! We'll be in touch.
              </div>
            )}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-xl">
                {error}
                {error.includes("log in") && (
                  <button onClick={() => navigate("/login")} className="ml-auto underline font-bold">
                    Login
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Patient Info Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label icon={FaUser} text="Full Name" />
                    <input
                      type="text"
                      name="patient_name"
                      required
                      placeholder="e.g. Ram Sharma"
                      value={form.patient_name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <Label icon={FaPhone} text="Contact Number" />
                    <input
                      type="tel"
                      name="patient_phone"
                      required
                      placeholder="e.g. 9800000000"
                      value={form.patient_phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <Label icon={FaEnvelope} text="Email" optional />
                    <input
                      type="email"
                      name="patient_email"
                      placeholder="e.g. ram@example.com"
                      value={form.patient_email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <Label icon={FaMapMarkerAlt} text="Address" optional />
                    <input
                      type="text"
                      name="patient_address"
                      placeholder="e.g. Kathmandu, Nepal"
                      value={form.patient_address}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Appointment Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Appointment Info</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Service</label>
                    <select
                      name="service"
                      required
                      className={inputClass}
                      onChange={handleChange}
                      value={form.service}
                    >
                      <option value="">-- Choose a Service --</option>
                      {services.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name} (Rs. {Number(s.price).toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Select Doctor / Dentist</label>
                    <select
                      name="dentist"
                      required
                      className={inputClass}
                      onChange={handleChange}
                      value={form.dentist}
                    >
                      <option value="">-- Choose a Doctor --</option>
                      {dentists.map(d => (
                        <option key={d.id} value={d.id}>
                          Dr. {d.first_name} {d.last_name}{d.specialty ? ` — ${d.specialty}` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                        <FaCalendarAlt className="text-blue-600" size={13} /> Date
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        className={inputClass}
                        onChange={handleChange}
                        value={form.date}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
                        <FaClock className="text-blue-600" size={13} /> Time
                      </label>
                      <select
                        name="time"
                        required
                        className={inputClass}
                        onChange={handleChange}
                        value={form.time}
                      >
                        <option value="">-- Time --</option>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Notes <span className="text-gray-400 font-normal">(optional)</span></label>
                    <textarea
                      name="notes"
                      placeholder="Any symptoms, concerns, or special requests?"
                      className={inputClass}
                      onChange={handleChange}
                      value={form.notes}
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-800 transition text-base"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Booking;
