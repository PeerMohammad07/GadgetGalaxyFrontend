import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-[#F6734B]">GadgetGalaxy</h1>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="relative"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="User Profile"
          >
            <User className="h-5 w-5" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0  w-36 bg-white rounded-md shadow-lg py-2 z-20">
              <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Switch Role
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </Link>
            </div>
          )}
        </div>

        <Link to="/logout" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <LogOut className="h-5 w-5" />
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;
