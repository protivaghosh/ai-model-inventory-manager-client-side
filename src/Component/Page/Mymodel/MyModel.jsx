import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyModel = () => {
  const { user } = useContext(AuthContext);
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://ai-model-manager.vercel.app/models?createdBy=${user.email}`)
      .then(res => res.json())
      .then(data => {
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
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (models.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-base-content">
        <p className="text-xl mb-4">You haven’t added any models yet</p>
        <Link
          to="/add-model"
          className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold"
        >
          Add New Model
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-base-100 text-base-content">
      <h2 className="text-4xl font-bold text-center mb-10">
        My Models ({models.length})
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map(model => (
          <div
            key={model._id}
            className="bg-base-200 rounded-2xl shadow-lg p-6 flex flex-col"
          >
            <img
              src={model.image}
              alt={model.name}
              className="h-48 w-full object-cover rounded-xl mb-4"
            />

            <h3 className="text-2xl font-semibold mb-1">{model.name}</h3>
            <p className="text-sm mb-1">
              <strong>Framework:</strong> {model.framework}
            </p>
            <p className="text-sm mb-3">
              <strong>Use Case:</strong> {model.useCase}
            </p>

            <div className="mt-auto flex gap-3">
              <Link
                to={`/models/${model._id}`}
                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm"
              >
                View
              </Link>

              <Link
                to={`/update-model/${model._id}`}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm font-semibold"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyModel;
