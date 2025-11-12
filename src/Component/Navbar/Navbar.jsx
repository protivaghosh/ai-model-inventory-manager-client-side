import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext); // 

  const isLoggedIn = !!user; 

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-purple-400 font-semibold border-b-2 border-purple-400 pb-1"
              : "text-white hover:text-purple-300 transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-Model"
          className={({ isActive }) =>
            isActive
              ? "text-purple-400 font-semibold border-b-2 border-purple-400 pb-1"
              : "text-white hover:text-purple-300 transition-colors"
          }
        >
          Add Model
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/view-model"
          className={({ isActive }) =>
            isActive
              ? "text-purple-400 font-semibold border-b-2 border-purple-400 pb-1"
              : "text-white hover:text-purple-300 transition-colors"
          }
        >
          View Models
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 backdrop-blur-lg bg-[#0b011a]/80 shadow-md border-b border-white/10">
      <div className="navbar text-white max-w-7xl mx-auto px-4">
        {/* Left Side */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-lg bg-[#1a1035]/90 backdrop-blur-xl rounded-xl w-56 border border-white/20"
            >
              {navLinks}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            AI Model Inventory
          </Link>
        </div>

        {/* Center Links (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-6">{navLinks}</ul>
        </div>

        {/* Right Side */}
        <div className="navbar-end">
          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-14 rounded-full border-2 border-purple-400">
                  <img
                    alt="User Profile"
                    src={user.photoURL || "https://i.ibb.co/9yRjFSp/user.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-3 shadow menu menu-sm dropdown-content bg-[#1a1035]/90 backdrop-blur-xl rounded-xl w-56 border border-white/20 text-white"
              >
                <li className="text-center font-semibold border-b border-white/20 pb-2">
                  <p className="text-sm">{user.displayName || "User"}</p>
                  <p className="text-xs text-white/70">{user.email}</p>
                </li>
                <li>
                  <Link to="">Model Purchase</Link>
                </li>
                <li>
                  <Link to="">My Models</Link>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="hover:text-purple-300 transition-colors w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-outline border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white px-5 py-2 rounded-lg font-semibold transition-all duration-200"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
