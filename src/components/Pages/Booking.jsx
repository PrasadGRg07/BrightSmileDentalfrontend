import { useState } from "react";

function Booking() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Appointment booked successfully!");
  };

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Book an Appointment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <select
          name="service"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        >
          <option>Select Service</option>
          <option>Dental Cleaning</option>
          <option>Teeth Whitening</option>
          <option>Dental Checkup</option>
        </select>

        <input
          type="date"
          name="date"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        />

        <select
          name="time"
          className="w-full border p-3 rounded-lg"
          onChange={handleChange}
        >
          <option>Select Time</option>
          <option>10:00 AM</option>
          <option>11:00 AM</option>
          <option>12:00 PM</option>
          <option>2:00 PM</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Book Appointment
        </button>

      </form>
    </div>
  );
}

export default Booking;