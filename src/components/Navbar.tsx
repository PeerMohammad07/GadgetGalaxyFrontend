import {
  HomeIcon,
  ShoppingBagIcon,
  InfoIcon,
  BookOpenIcon,
  HeartIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import { logoutApi } from '../Api/userApi';
import { userLogout } from '../Redux/Slices/userSlice';

const Navbar:React.FC<any> = ({count}) => {
  const userData = useSelector((state:RootState)=> state.user.userData)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch()

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 font-bold text-2xl text-orange-500">
            Logo
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/" icon={<HomeIcon size={18} />} text="Home" active />
            <NavLink href="/shop" icon={<ShoppingBagIcon size={18} />} text="Shop" />
            <NavLink href="/about" icon={<InfoIcon size={18} />} text="About us" />
            <NavLink href="/blog" icon={<BookOpenIcon size={18} />} text="Blog" />
            <NavLink href="/wishlist" icon={<HeartIcon size={18} />} text="Wishlist" />
          </div>

          <div className="flex items-center space-x-4">
            {userData ? (
              <div
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="p-2 hover:bg-orange-50 rounded-full transition-colors"
                  aria-label="User Profile"
                >
                  <FaUser className="h-5 w-5 text-gray-600" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0  w-48 bg-white rounded-md shadow-lg py-2 z-20">
                    <Link
                      to="/admin/adminDashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Switch Role
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={async ()=>{
                        await logoutApi()
                        dispatch(userLogout())
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 bg-white border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 font-medium text-sm"
                >
                  <FaUser className="h-4 w-4 mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-all duration-300 font-medium text-sm"
                >
                  Register
                </Link>
              </div>
            )}
            <Link
            to={'/cart'}
              className="p-2 hover:bg-orange-50 rounded-full transition-colors relative"
              aria-label="Shopping Cart"
            >
              <FaShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {count ? count : "0"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<any> = ({ href, icon, text, active = false }) => {
  return (
    <a
      href={href}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${active
          ? 'text-orange-500 hover:text-orange-600'
          : 'text-gray-600 hover:text-orange-500'
        }`}
    >
      {icon}
      <span>{text}</span>
    </a>
  );
};

export default Navbar;
