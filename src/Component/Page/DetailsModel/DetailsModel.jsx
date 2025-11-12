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
          Swal.fire("Deleted!", data.message || "Your model has been deleted.", "success");
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
    return <p className="text-center text-white mt-10 text-xl animate-pulse">Loading...</p>;
  }

  if (!model) {
    return <p className="text-center text-red-400 mt-10 text-lg">Model not found.</p>;
  }

  const isCreator = user?.email?.toLowerCase() === model?.createdBy?.toLowerCase();

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center py-10 px-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-8 max-w-3xl text-white">
        {/* Model Image */}
        {model?.image && (
          <img
            src={model.image}
            alt={model.name || "Model Image"}
            className="w-full h-72 object-cover rounded-xl mb-6 border border-white/20"
          />
        )}

        {/* Model Info */}
        <h2 className="text-4xl font-bold mb-3 text-indigo-300">{model?.name || "Unknown Model"}</h2>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-indigo-400">Framework:</span> {model?.framework || "N/A"}
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-indigo-400">Use Case:</span> {model?.useCase || "N/A"}
        </p>
        <p className="text-gray-300 mb-2">
          <span className="font-semibold text-indigo-400">Dataset:</span> {model?.dataset || "N/A"}
        </p>
        <p className="text-gray-400 mt-4">{model?.description || "No description available."}</p>
        <p className="mt-6 text-sm text-gray-400">
          Created by: <span className="text-indigo-300">{model?.createdBy || "Unknown"}</span>
        </p>
        <p className="text-sm text-gray-400">Purchased {model?.purchased || 0} times</p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={handlePurchase}
            className="btn btn-outline border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white px-3 py-2 rounded-lg font-semibold transition-all duration-200"
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
