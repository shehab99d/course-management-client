import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut().catch((err) => console.error(err));
    setIsMenuOpen(false); // optional: close dropdown on logout
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-purple-600 font-semibold border-b-2 border-purple-500"
      : "hover:text-purple-500 transition duration-200";

  const menuItems = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/courses" className={navLinkClass}>
              Courses
            </NavLink>
          </li>
          <li>
            <NavLink to="/add-course" className={navLinkClass}>
              Add Course
            </NavLink>
          </li>
          <li>
            <NavLink to="/manage-courses" className={navLinkClass}>
              Manage Courses</NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/jobs" className={navLinkClass}>
            Jobs
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      {/* Left - Logo */}
      <div className="navbar-start">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition duration-300"
        >
          <img
            src="https://i.ibb.co/gLn8d8ML/images-q-tbn-ANd9-Gc-R38y-MTRJHw5-M-eh-Pn-Zvz65-48u-MKb-I5q-V7q-Q-s.png"
            alt="Logo"
            className="w-8 h-8"
          />
          CourseHub
        </Link>
      </div>

      {/* Center - Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg font-medium">
          {menuItems}
        </ul>
      </div>


      <div className="navbar-end lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl p-2"
        >
          <FaBars />
        </button>
      </div>

      {/* Right - Auth Buttons (Desktop Only) */}
      <div className="navbar-end hidden lg:flex gap-2">
        {user ? (
          <>
            <div
              className="tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2 transition-transform hover:scale-105">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="Profile"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className="btn btn-sm btn-outline hover:btn-primary transition duration-200"
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition"
            >
              Register
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md rounded-b-lg px-4 py-4 lg:hidden z-40 space-y-4">
          <ul className="space-y-2 text-base">{menuItems}</ul>

          {/* Mobile Profile & Auth */}
          <div className="mt-4 flex flex-col items-center gap-3">
            {user ? (
              <>
                <div className="avatar">
                  <div className="w-14 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="Profile"
                    />
                  </div>
                </div>
                <p className="text-center font-medium text-purple-600">
                  {user.displayName}
                </p>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="btn btn-sm btn-outline w-full">
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
