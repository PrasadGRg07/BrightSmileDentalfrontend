import { FaFacebook } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";

function Footer() {
  return (
    <footer className="border-t mt-16 py-10 bg-gray-100 text-gray-700">
      
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        
        {/* Left Side */}
        <div>
        <h2 className="text-lg font-semibold mb-2">Bright Smile Dental</h2>
                  
          <p className="text-sm">
                      Kathmandu, Nepal <br />
             <a href="tel:01-4519594" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                  > <FaPhone size={16} />
                        <p>01-4519594</p>  </a>


            Email: drsachin1108@gmail.com
                  </p>
        {/* Facebook Link */}
        <a href="https://www.facebook.com/brightsmilenepal" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
                  > <FaFacebook size={20} />
                      <p>Bright Smile Dental Pvt Ltd</p> <br />
    
    <span>Follow us on Facebook</span>
  </a>
        </div>

        {/* Right Side - Google Map */}
        <div className="w-full h-64">
          <iframe
            title="Google Map Location"
            src="https://www.google.com/maps/embed?pb=!4v1772529149932!6m8!1m7!1sCAoSHENJQUJJaEQxc2I4LVNKRUg0Mk9UWldvQkpMMTY.!2m2!1d27.71634353210872!2d85.32463993010771!3f105.44173812397725!4f-1.7223461063962304!5f0.7820865974627469"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-md"
          ></iframe>
        </div>

      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Bright Smile Dental 2026. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;