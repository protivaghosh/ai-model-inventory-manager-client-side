import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AllModels = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/models") // তোমার backend link
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch((err) => console.error("Error fetching models:", err));
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen py-10 px-6">
      <h2 className="text-4xl font-bold text-center text-white mb-10">
        All AI Models
      </h2>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {models.map((model) => (
          <div
            key={model._id}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 p-6 flex flex-col items-center text-center"
          >
            <img
              src={model.image}
              alt={model.name}
              className=" object-cover rounded-xl mb-4 border border-white/20"
            />
            <h3 className="text-2xl font-semibold text-white mb-2">
              {model.name}
            </h3>
            <p className="text-gray-300 mb-1">
              <span className="font-medium text-indigo-400">Framework:</span>{" "}
              {model.framework}
            </p>
            <p className="text-gray-300 mb-4">
              <span className="font-medium text-indigo-400">Use Case:</span>{" "}
              {model.useCase}
            </p>

            <Link
              to={`/models/${model._id}`}
              className="btn btn-outline border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white px-2 py-1 lg:px-5 lg:py-2 rounded-lg font-semibold transition-all duration-200"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllModels;
