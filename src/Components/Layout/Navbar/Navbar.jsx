import { Link, NavLink } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaBars } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import ThemeToggle from "../../ThemeToggle";
// import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileRef = useRef();

  const handleLogout = () => {
    logOut().catch((err) => console.error(err));
    setIsProfileDropdownOpen(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-white text-gray-800 font-semibold rounded-md px-2 py-1 transition"
      : "text-white hover:text-gray-300 transition duration-200";

  const loggedInRoutes = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/courses" className={navLinkClass}>Courses</NavLink></li>
      <li><NavLink to="/add-course" className={navLinkClass}>Add Course</NavLink></li>
      <li><NavLink to="/manage-courses" className={navLinkClass}>Manage Courses</NavLink></li>
      <li><NavLink to="/myEnrolledPage" className={navLinkClass}>My Enrolled Course</NavLink></li>
      <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
    </>
  );

  const loggedOutRoutes = (
    <>
      <li><NavLink to="/" className={navLinkClass}>Home</NavLink></li>
      <li><NavLink to="/jobs" className={navLinkClass}>Course</NavLink></li>
      <li><NavLink to="/add-course" className={navLinkClass}>Add Course</NavLink></li>
      <li><NavLink to="/about" className={navLinkClass}>About Us</NavLink></li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full shadow-md" style={{ backgroundColor: "#1c2e4a" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-16">
          
          {/* Left - Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white hover:scale-105 transition duration-300">
            <img
              src="https://i.ibb.co/gLn8d8ML/images-q-tbn-ANd9-Gc-R38y-MTRJHw5-M-eh-Pn-Zvz65-48u-MKb-I5q-V7q-Q-s.png"
              alt="Logo"
              className="w-8 h-8"
            />
            CourseHub
          </Link>

          {/* Center - Menu for large screens */}
          <ul className="hidden lg:flex space-x-6 font-medium text-lg">
            {user ? loggedInRoutes : loggedOutRoutes}
          </ul>

          {/* Right - Theme toggle + Auth/Profile */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle button */}
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-2xl lg:hidden"
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>

            {/* Profile dropdown */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
                  className="flex items-center space-x-1 focus:outline-none"
                  aria-label="User menu"
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full ring-2 ring-white object-cover hover:scale-105 transition-transform"
                  />
                  <IoMdArrowDropdown className="text-white text-xl" />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white/35 rounded-md shadow-lg py-2 z-50">
                    <p className="px-4 py-2 text-black font-semibold border-b border-gray-200">
                      {user.displayName || "User"}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-black text-black font-semibold transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex space-x-3">
                <NavLink
                  to="/login"
                  className="px-4 py-1 border border-white rounded text-white hover:bg-white hover:text-gray-900 transition"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-1 bg-pink-600 rounded text-white hover:bg-pink-700 transition"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="flex flex-col px-6 py-4 space-y-3 text-gray-700 font-medium">
            {user ? loggedInRoutes : loggedOutRoutes}
          </ul>
          <div className="border-t border-gray-200 px-6 py-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-700"
                />
                <div>
                  <p className="font-semibold text-purple-700">
                    {user.displayName || "User"}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="mt-1 px-3 py-1 bg-purple-700 text-white rounded text-sm hover:scale-105 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 border border-purple-700 rounded text-purple-700 text-center hover:bg-purple-100 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-purple-700 text-white rounded text-center hover:scale-105 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
