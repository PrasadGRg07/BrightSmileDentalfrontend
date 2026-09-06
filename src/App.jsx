import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, Link } from "react-router-dom";
import LandingPage from "./LandingPage";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Booking from "./components/Pages/Booking";
import AboutUs from "./components/Pages/AboutUs";
import Services from "./components/Pages/Services";
import Contact from "./components/Pages/Contact";
import DoctorDetail from "./components/Pages/DoctorDetail";
import DoctorDashboard from "./components/Pages/DoctorDashboard";
import DentistDashboard from "./components/Pages/DentistDashboard";
import PatientDashboard from "./components/Pages/PatientDashboard";
import ReceptionistDashboard from "./components/Pages/ReceptionistDashboard";
import Login from "./components/Pages/Login";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/Dashboard";
import AdminBookings from "./admin/Bookings";
import AdminMessages from "./admin/Messages";
import AdminServices from "./admin/Services";
import AdminDoctors from "./admin/Doctors";
import { isAdminLoggedIn } from "./utils/store";

function AdminRoute() {
  if (!isAdminLoggedIn()) return <Navigate to="/admin/login" replace />;
  return <AdminLayout />;
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block bg-blue-700 text-white font-medium px-6 py-3 rounded-xl hover:bg-blue-800 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="bookings" element={<AdminBookings />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="doctors" element={<AdminDoctors />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/features" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Role-based dashboards — no Navbar or Footer */}
        <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
        <Route path="/dashboard/dentist" element={<DentistDashboard />} />
        <Route path="/dashboard/patient" element={<PatientDashboard />} />
        <Route path="/dashboard/receptionist" element={<ReceptionistDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;