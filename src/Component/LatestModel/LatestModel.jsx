import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const LatestModel = () => {
  const [latestModels, setLatestModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://ai-model-manager.vercel.app/latest-models")
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch latest models");
        return res.json();
      })
      .then(data => {
        setLatestModels(data); 
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10 text-pink-800 animate-pulse">Loading latest models...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen py-10 px-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Latest Models
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestModels.map(model => (
          <div
            key={model._id}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-5 rounded-2xl shadow-lg hover:scale-105 transition-all"
          >
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-48 object-cover rounded-xl mb-4 border border-white/20"
            />
            <h2 className="text-2xl font-bold mb-2">{model.name}</h2>
            <p><span className="font-semibold text-indigo-300">Framework:</span> {model.framework}</p>
            <p><span className="font-semibold text-indigo-300">Use Case:</span> {model.useCase}</p>
            <p><span className="font-semibold text-indigo-300">Dataset:</span> {model.dataset}</p>
            <p className="mt-2">{model.description}</p>
            <div className="mt-4">
              <button
                onClick={() => navigate(`/models/${model._id}`)}
                className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg font-semibold"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
         <Link to='/models' className="btn mt-6 bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg font-semibold text-base-100">AI All Model</Link>
      </div>
    </div>
  );
};

export default LatestModel;
