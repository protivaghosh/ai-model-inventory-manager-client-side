import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const DetailsModel = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch model details
  useEffect(() => {
    fetch(`http://localhost:5000/models/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setModel(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch model details");
        setLoading(false);
      });
  }, [id]);

  // Purchase model
  const handlePurchase = async () => {
    if (!user) return toast.error("Please login first!");

    try {
      const res = await fetch(`http://localhost:5000/purchase/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || "Model purchased successfully!");
        setModel((prev) => ({
          ...prev,
          purchased: data.updatedModel?.purchased || prev.purchased + 1,
        }));
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error("Purchase Error:", err);
      toast.error("Server error, try again later");
    }
  };

  // Delete model
  const handleDelete = async () => {
    if (!user) return toast.error("Please login first!");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:5000/models/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (res.ok) {
          Swal.fire(
            "Deleted!",
            data.message || "Your model has been deleted.",
            "success"
          );
          navigate("/models");
        } else {
          toast.error(data.message || "Failed to delete model!");
        }
      } catch (err) {
        console.error("Delete Error:", err);
        toast.error("Server error, try again later");
      }
    }
  };

  // Loading & Null checks
  if (loading) {
    return (
      <p className="text-center text-white mt-10 text-xl animate-pulse">
        Loading...
      </p>
    );
  }

  if (!model) {
    return (
      <p className="text-center text-red-400 mt-10 text-lg">Model not found.</p>
    );
  }

  const isCreator =
    user?.email?.toLowerCase() === model?.createdBy?.toLowerCase();

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-6">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8 max-w-3xl text-white">
        {/* Model Image */}
        {model?.image && (
          <img
            src={model.image}
            alt={model.name || "Model Image"}
            className="w-full h-72 object-cover rounded-xl mb-6 border border-white/20 shadow-md"
          />
        )}

        {/* Model Info */}
        <h2 className="text-4xl font-bold mb-3 text-gray-100 drop-shadow">
          {model?.name || "Unknown Model"}
        </h2>
        <p className="text-gray-100 mb-2">
          <span className="font-semibold text-indigo-200">Framework:</span>{" "}
          {model?.framework || "N/A"}
        </p>
        <p className="text-gray-100 mb-2">
          <span className="font-semibold text-indigo-200">Use Case:</span>{" "}
          {model?.useCase || "N/A"}
        </p>
        <p className="text-gray-100 mb-2">
          <span className="font-semibold text-indigo-200">Dataset:</span>{" "}
          {model?.dataset || "N/A"}
        </p>
        <p className="text-gray-200 mt-4">{model?.description || "No description available."}</p>
        <p className="mt-6 text-sm text-gray-300">
          Created by: <span className="text-indigo-200">{model?.createdBy || "Unknown"}</span>
        </p>
        <p className="text-sm text-gray-300">
          Purchased {model?.purchased || 0} times
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={handlePurchase}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg border border-white/30 shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-300"
          >
            Purchase Model
          </button>

          {isCreator && (
            <>
              <button
                onClick={() => navigate(`/update-model/${model._id}`)}
                className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-lg font-semibold transition-all"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold transition-all"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModel;
