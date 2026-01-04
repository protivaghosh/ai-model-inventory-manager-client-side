import { NavLink, Outlet } from "react-router-dom";
import { useContext } from "react";

import { FaHome, FaUser, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { AuthContext } from "../AuthProvider/AuthProvider";

const DashBoardLayout = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="min-h-screen grid grid-cols-12 bg-gray-100 dark:bg-gray-900">
      
      {/* 🔹 Sidebar */}
      <aside className="col-span-12 md:col-span-3 lg:col-span-2 bg-white dark:bg-gray-800 shadow-lg p-5">
        <h2 className="text-2xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-8">
          Dashboard
        </h2>

        <nav className="space-y-4">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
              ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaHome /> Overview
          </NavLink>

          <NavLink
            to="/dashboard/my-models"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
              ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaBoxOpen /> My Models
          </NavLink>

          <NavLink
            to="/dashboard/purchased-models"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
              ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaShoppingCart /> Purchased Models
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition
              ${
                isActive
                  ? "bg-indigo-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700"
              }`
            }
          >
            <FaUser /> Profile
          </NavLink>
        </nav>
      </aside>

      {/* 🔹 Main Content */}
      <main className="col-span-12 md:col-span-9 lg:col-span-10">
        
        {/* 🔸 Top Navbar */}
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 shadow px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome, {user?.displayName || "User"}
          </h1>

          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
            />
            <button
              onClick={logOut}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* 🔸 Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashBoardLayout;
