import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isLoggedIn = !!user;

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold border-b-2 border-purple-400 pb-1 text-purple-400"
              : "hover:text-purple-400 transition-colors"
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
              ? "font-semibold border-b-2 border-purple-400 pb-1 text-purple-400"
              : "hover:text-purple-400 transition-colors"
          }
        >
          Add Model
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/models"
          className={({ isActive }) =>
            isActive
              ? "font-semibold border-b-2 border-purple-400 pb-1 text-purple-400"
              : "hover:text-purple-400 transition-colors"
          }
        >
          All Models
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-200 text-base-content sticky top-0 z-50 shadow-md px-4">
      {/* Left: Logo + Mobile menu */}
      <div className="navbar-start">
        {/* Mobile Hamburger */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {/* Theme toggle */}
            <li>
              <button className="w-full text-left" onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
              </button>
            </li>
            <hr />
            {navLinks}
            <hr />
            {isLoggedIn && (
              <>
                <li>
                  <Link to="purchased-models">Model Purchase</Link>
                </li>
                <li>
                  <Link to="my-models">My Models</Link>
                </li>
                <li>
                  <button onClick={logOut}>Logout</button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link
          to="/"
          className="ml-2 text-2xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          AI Model Inventory
        </Link>
      </div>

      {/* Center Links (Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">{navLinks}</ul>
      </div>

      {/* Right: Desktop Avatar & Theme */}
      {isLoggedIn && (
        <div className="navbar-end  lg:flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border">
                <img src={user.photoURL || "https://i.ibb.co/9yRjFSp/user.png"} alt="User" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-1"
            >
              <li className="text-center">
                <p className="font-semibold">{user.displayName || "User"}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </li>
              <hr />
              <li>
                <button className="w-full text-left" onClick={toggleTheme}>
                  {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>
              </li>
              <hr />
              <li>
                <Link to="purchased-models">Model Purchase</Link>
              </li>
              <li>
                <Link to="my-models">My Models</Link>
              </li>
              <li>
                <button onClick={logOut}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <div className="navbar-end hidden lg:flex">
          <Link className="btn btn-outline btn-sm" to="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
