import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    return (
        <nav className='bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50'>
            
            {/* Logo */}
            <div>
                <Link to="/" className='text-2xl font-bold text-gray-800'>
                    Bright Smile Dental
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
                <Link to="/" className="text-gray-600 hover:text-blue-900 font-medium transition-colors">
                    Home
                </Link>
                <Link to="/features" className="text-gray-600 hover:text-blue-900 font-medium transition-colors">
                    Features
                </Link>
                <Link to="/aboutus" className="text-gray-600 hover:text-blue-900 font-medium transition-colors">
                    About Us
                </Link>
                <Link to="/booking" className="text-gray-600 hover:text-blue-900 font-medium transition-colors">
                    Book an Appointment
                </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={() => navigate('/login')}
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                    Login
                </button>
                <button
                    onClick={() => navigate('/signup')}
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                    Sign Up
                </button>
            </div>
        </nav>
    );
}

export default Navbar;