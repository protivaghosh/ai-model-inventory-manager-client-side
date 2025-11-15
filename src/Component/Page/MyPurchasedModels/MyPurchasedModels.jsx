import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router";
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

  if (loading) return <p className="text-center text-white mt-10 text-xl animate-pulse">Loading...</p>;

  if (purchases.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-300">
        <p className="text-xl mb-3">You haven't purchased any models yet!</p>
      </div>
    );
  }

  return (
    <div className=" min-h-screen py-10 px-6">
      <h1 className="text-4xl text-center font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-10">
        My Purchased Models ({purchases.length})
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {purchases.map((item) => (
          <div
            key={item._id}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-6 text-white hover:scale-105 transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-xl mb-4 border border-white/20"
            />
            <h2 className="text-2xl font-bold text-gray-100 mb-2">{item.name}</h2>
            <p className="text-gray-300">
              <span className="font-semibold text-indigo-400">Framework:</span> {item.framework}
            </p>
            <p className="text-gray-300">
              <span className="font-semibold text-indigo-400">Use Case:</span> {item.useCase}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Created by: <span className="text-indigo-300">{item.createdBy}</span>
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Purchased by: <span className="text-indigo-300">{item.purchasedBy}</span>
            </p>

            <div className="mt-4">
              <Link
                to={`/models/${item.modelId}`}
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

export default MyPurchasedModels;
