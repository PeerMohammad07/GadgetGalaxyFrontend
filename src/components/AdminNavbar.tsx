import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { adminLogout } from "../Redux/Slices/adminSlice";
import { useDispatch } from "react-redux";
import { logoutApiAdmin } from "../Api/adminApi";

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch()

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
            </div>
          )}
        </div>

        <button onClick={async () => {
          dispatch(adminLogout())
          await logoutApiAdmin()
        }} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
