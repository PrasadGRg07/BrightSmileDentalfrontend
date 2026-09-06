import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { addAppointment } from "../../utils/store";

function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: ""
  });
  const [booked, setBooked] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAppointment(form);
    setBooked(true);
    setForm({ name: "", email: "", phone: "", service: "", date: "", time: "" });
  };

  const inputClass =
    "w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero */}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              className={inputClass}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className={inputClass}
              onChange={handleChange}
            />

            <input
              type="tel"
              name="phone"
              required
              placeholder="Phone Number"
              className={inputClass}
              onChange={handleChange}
            />

            <select
              name="service"
              required
              className={inputClass}
              onChange={handleChange}
            >
              <option value="">Select Service</option>
              <option>Dental Cleaning</option>
              <option>Teeth Whitening</option>
              <option>Dental Checkup</option>
              <option>Root Canal Treatment</option>
              <option>Crowns & Bridges</option>
              <option>Dental Implants</option>
              <option>Braces & Aligners</option>
              <option>Tooth Extraction</option>
              <option>Veneers</option>
              <option>Dentures</option>
              <option>Pediatric Care</option>
            </select>

            <input
              type="date"
              name="date"
              required
              className={inputClass}
              onChange={handleChange}
            />

            <select
              name="time"
              required
              className={inputClass}
              onChange={handleChange}
            >
              <option value="">Select Time</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>2:00 PM</option>
              <option>3:00 PM</option>
              <option>4:00 PM</option>
            </select>

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
