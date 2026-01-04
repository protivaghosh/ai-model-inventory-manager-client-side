import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [recentModels, setRecentModels] = useState([]);

  useEffect(() => {
    fetch(`https://ai-model-manager.vercel.app/dashboard-stats?email=${user?.email}`)
      .then(res => res.json())
      .then(data => {
        setStats(data.stats);
        setRecentModels(data.recentModels);
      });
  }, [user?.email]);

  const COLORS = ["#6366F1", "#EC4899"];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 dark:text-white">
        Dashboard Overview
      </h2>

      {/* ===== Overview Cards ===== */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Total Models</h3>
          <p className="text-3xl font-bold">{stats?.totalModels || 0}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold">My Models</h3>
          <p className="text-3xl font-bold">{stats?.myModels || 0}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold">Purchased</h3>
          <p className="text-3xl font-bold">{stats?.purchased || 0}</p>
        </div>
      </div>

      {/* ===== Chart ===== */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
        <h3 className="text-xl font-semibold mb-4">
          Models by Framework
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={stats?.frameworkStats || []}
              dataKey="count"
              nameKey="_id"
              outerRadius={120}
            >
              {stats?.frameworkStats?.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* ===== Table ===== */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">
          Recent Models
        </h3>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Framework</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentModels.map(model => (
              <tr key={model._id} className="border-b">
                <td>{model.name}</td>
                <td>{model.framework}</td>
                <td>{new Date(model.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <Link
          to="/dashboard/add-model"
          className="bg-indigo-500 text-white px-6 py-2 rounded-lg"
        >
          ➕ Add New Model
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;
