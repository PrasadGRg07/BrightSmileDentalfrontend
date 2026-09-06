import { BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";
import LandingPage from "./LandingPage";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Booking from "./components/Pages/Booking";

function AppContent() {
  const location = useLocation();
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<Booking />} />

        </Routes>
      </div>
      <Footer/>
    </>
  );
}
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;