import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isLoggedIn = !!user;

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-yellow-300 font-semibold border-b-2 border-yellow-300 pb-1"
      : "text-white hover:text-yellow-200 transition";

  const navLinks = (
    <>
      <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
      <li><NavLink to="/models" className={linkClass}>All Models</NavLink></li>
      {isLoggedIn && (
        <li><NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink></li>
      )}
      {!isLoggedIn && (
        <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
      )}
    </>
  );

  return (
    <div className="
      navbar
      sticky top-0 z-50 px-4
      bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
      shadow-lg
    ">
      {/* Left */}
      <div className="navbar-start">
        {/* Mobile */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost text-white lg:hidden">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="
              menu dropdown-content mt-3 p-2 w-52 rounded-box shadow
              bg-white text-gray-800
              dark:bg-gray-800 dark:text-white
            "
          >
            {navLinks}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-white"
        >
          AI Model Inventory
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6">
          {navLinks}
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end flex items-center gap-2">
        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle text-white hover:bg-white/20"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        {!isLoggedIn ? (
          <Link
            to="/login"
            className="btn btn-sm bg-white text-purple-700 hover:bg-gray-100"
          >
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <img
                className="w-10 rounded-full border-2 border-white"
                src={user.photoURL || "https://i.ibb.co/9yRjFSp/user.png"}
                alt="user"
              />
            </label>

            <ul
              tabIndex={0}
              className="
                menu dropdown-content mt-3 p-2 w-56 rounded-box shadow
                bg-white text-gray-800
                dark:bg-gray-800 dark:text-white
              "
            >
              <li className="text-center mb-2">
                <p className="font-semibold">{user.displayName}</p>
                <p className="text-xs opacity-70">{user.email}</p>
              </li>
              <hr />
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/dashboard/profile">Profile</Link></li>
              <li><Link to="/dashboard/my-models">My Models</Link></li>
              <li><Link to="/dashboard/purchased-models">Purchased</Link></li>
              <hr />
              <li><button onClick={logOut}>Logout</button></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
