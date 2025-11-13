import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllModels = () => {
  const [models, setModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [framework, setFramework] = useState(""); // NEW: framework filter
  const [loading, setLoading] = useState(true);

  // Fetch models from backend
  const fetchModels = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:5000/models?`;
      if (searchTerm) url += `name=${encodeURIComponent(searchTerm)}&`;
      if (framework) url += `framework=${encodeURIComponent(framework)}&`;

      const res = await fetch(url);
      if (!res.ok) {
        console.error("Server returned error:", res.status);
        setModels([]);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setModels(data);
    } catch (err) {
      console.error("Error fetching models:", err);
      setModels([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all models on mount and when searchTerm or framework changes
  useEffect(() => {
    fetchModels();
  }, [searchTerm, framework]); // ✅ added dependency on framework

  return (
    <div className="bg-base-200 text-base-content min-h-screen py-10 px-6">
      <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
        All AI Models
      </h2>

      {/* Search + Framework Filter */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto mb-8">
        {/* Search */}
        <input
          type="text"
          placeholder="Search models by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        />

        {/* Framework Filter */}
        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        >
          <option value="">All Frameworks</option>
          <option value="TensorFlow">TensorFlow</option>
          <option value="PyTorch">PyTorch</option>
        </select>
      </div>

      {/* Cards Container */}
      {loading ? (
        <p className="text-center text-white text-xl animate-pulse">Loading...</p>
      ) : models.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {models.map((model) => (
            <div
              key={model._id}
              className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 p-6 flex flex-col items-center text-center"
            >
              <img
                src={model.image || "https://via.placeholder.com/400x250"}
                alt={model.name}
                className="h-48 w-full object-cover rounded-xl mb-4 border border-white/30 shadow-md"
              />
              <h3 className="text-2xl font-semibold text-white mb-2 drop-shadow">
                {model.name}
              </h3>
              <p className="text-sm text-gray-100 mb-1">
                <span className="font-medium text-yellow-200">Framework:</span>{" "}
                {model.framework || "N/A"}
              </p>
              <p className="text-sm text-gray-100 mb-4">
                <span className="font-medium text-cyan-200">Use Case:</span>{" "}
                {model.useCase || "N/A"}
              </p>

              <Link
                to={`/models/${model._id}`}
                className="px-6 py-2 mt-auto bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg border border-white/30 shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-300"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300 text-xl mt-10">
          No models found.
        </p>
      )}
    </div>
  );
};

export default AllModels;
