import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router";
import toast from "react-hot-toast";

const MyModel = () => {
  const { user } = useContext(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    console.log("Fetching my models for:", user.email);

    //  Fetch only models created by the logged-in user
    fetch(`https://ai-model-manager.vercel.app/models?createdBy=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setModels(data);
       setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load your models");
        setLoading(false);
      });
  }, [user?.email]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading your models...
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-300">
        <p className="text-xl mb-3">You haven’t added any models yet!</p>
        <Link
          to="/add-model"
          className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-white"
        >
          Add New Model
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-6">
      <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-10">
        My Models ({models.length})
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model) => (
          <div
            key={model._id}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 text-white hover:scale-105 transition-all duration-300"
          >
            <img
              src={model.image}
              alt={model.name}
              className="w-full h-48 object-cover rounded-xl mb-4 border border-white/20"
            />
            <h2 className="text-2xl font-bold text-gray-100 mb-2">
              {model.name}
            </h2>
            <p className="text-gray-300">
              <span className="font-semibold text-indigo-400">Framework:</span>{" "}
              {model.framework}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-indigo-400">Use Case:</span>{" "}
              {model.useCase}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Created by: <span className="text-indigo-300">{model.createdBy}</span>
            </p>

            <div className="mt-4">
              <Link
                to={`/models/${model._id}`}
                className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg text-white font-semibold transition-all"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyModel;
