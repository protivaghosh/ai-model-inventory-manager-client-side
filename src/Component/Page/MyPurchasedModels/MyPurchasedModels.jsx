import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyPurchasedModels = () => {
  const { user } = useContext(AuthContext);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://ai-model-manager.vercel.app/purchases?purchasedBy=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setPurchases(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load purchased models");
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

  if (purchases.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-base-content">
        <p className="text-xl">You haven’t purchased any models yet</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-base-100 text-base-content">
      <h2 className="text-4xl font-bold text-center mb-10">
        My Purchased Models ({purchases.length})
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {purchases.map(item => (
          <div
            key={item._id}
            className="bg-base-200 rounded-2xl shadow-lg p-6 flex flex-col"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <h3 className="text-2xl font-semibold mb-1">{item.name}</h3>

            <p className="text-sm mb-1">
              <strong>Framework:</strong> {item.framework}
            </p>

            <p className="text-sm mb-4">
              <strong>Use Case:</strong> {item.useCase}
            </p>

            <p className="text-xs text-gray-500 mb-4">
              Created by: {item.createdBy}
            </p>

            <Link
              to={`/models/${item.modelId}`}
              className="mt-auto px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-center font-semibold"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPurchasedModels;
