import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext/ThemeContext";


const AllModels = () => {
  const { theme } = useContext(ThemeContext);

  const [models, setModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [framework, setFramework] = useState("");
  const [loading, setLoading] = useState(true);

  const API_URL = "https://ai-model-manager.vercel.app";

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}/models?`;
        if (searchTerm) url += `name=${encodeURIComponent(searchTerm)}&`;
        if (framework) url += `framework=${encodeURIComponent(framework)}&`;

        const res = await fetch(url);
        const data = await res.json();
        setModels(data);
      } catch (error) {
        console.error(error);
        setModels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, [searchTerm, framework]);

  return (
    <div className="min-h-screen py-10 px-6 bg-base-100 text-base-content">
      <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        All AI Models
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Search by model name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg border border-base-300 bg-base-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
          className="w-full p-3 rounded-lg border border-base-300 bg-base-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All Frameworks</option>
          <option value="TensorFlow">TensorFlow</option>
          <option value="PyTorch">PyTorch</option>
        </select>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-lg animate-pulse">Loading models...</p>
      ) : models.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {models.map((model) => (
            <div
              key={model._id}
              className="bg-base-200 rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col"
            >
              <img
                src={model.image || "https://via.placeholder.com/400x250"}
                alt={model.name}
                className="h-48 w-full object-cover rounded-xl mb-4"
              />

              <h3 className="text-2xl font-semibold mb-2">{model.name}</h3>

              <p className="text-sm mb-1">
                <span className="font-semibold">Framework:</span>{" "}
                {model.framework || "N/A"}
              </p>

              <p className="text-sm mb-4">
                <span className="font-semibold">Use Case:</span>{" "}
                {model.useCase || "N/A"}
              </p>

              <Link
                to={`/models/${model._id}`}
                className="mt-auto text-center px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">No models found.</p>
      )}
    </div>
  );
};

export default AllModels;
