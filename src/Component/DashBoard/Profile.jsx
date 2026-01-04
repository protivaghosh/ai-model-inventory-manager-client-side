import React, { useContext, useState } from "react";


import toast from "react-hot-toast";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { ThemeContext } from "../ThemeContext/ThemeContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);

    // UI-level update (backend optional)
    setTimeout(() => {
      toast.success("Profile updated successfully (UI)");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content px-6 py-10">
      <h2 className="text-4xl font-bold text-center mb-10">
        My Profile
      </h2>

      <div className="max-w-4xl mx-auto bg-base-200 rounded-2xl shadow-lg p-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img
            src={photo || "https://i.ibb.co/9yRjFSp/user.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
          />

          <div>
            <h3 className="text-2xl font-semibold">
              {user?.displayName || "User"}
            </h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <p className="text-sm mt-1">
              Role: <span className="font-semibold">User</span>
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-base-100"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Photo URL</label>
            <input
              type="text"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 bg-base-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-200 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Account Type</label>
            <input
              type="text"
              value="Standard User"
              disabled
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-200 cursor-not-allowed"
            />
          </div>

          <div className="md:col-span-2 text-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
