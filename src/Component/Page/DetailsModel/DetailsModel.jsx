import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { ThemeContext } from "../../ThemeContext/ThemeContext";

const DetailsModel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://ai-model-manager.vercel.app";

  useEffect(() => {
    fetch(`${API_URL}/models/${id}`)
      .then(res => res.json())
      .then(data => {
        setModel(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load model details");
        setLoading(false);
      });
  }, [id]);

  const isCreator =
    user?.email?.toLowerCase() === model?.createdBy?.toLowerCase();

  const handlePurchase = async () => {
    if (!user) return toast.error("Please login first");
    if (isCreator) return toast.error("You cannot purchase your own model");

    try {
      const res = await fetch(`${API_URL}/purchase/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Model purchased successfully");
        setModel(prev => ({
          ...prev,
          purchased: (prev.purchased || 0) + 1,
        }));
      } else {
        toast.error(data.message || "Purchase failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      const res = await fetch(`${API_URL}/models/${id}`, { method: "DELETE" });
      if (res.ok) {
        Swal.fire("Deleted!", "Model removed successfully", "success");
        navigate("/models");
      } else {
        toast.error("Delete failed");
      }
    }
  };

  if (loading)
    return <p className="text-center mt-10 animate-pulse">Loading...</p>;

  if (!model)
    return <p className="text-center text-red-500 mt-10">Model not found</p>;

  return (
    <div className="min-h-screen flex justify-center items-center px-6 py-10 bg-base-100 text-base-content">
      <div className="bg-base-200 rounded-2xl shadow-xl p-8 max-w-3xl w-full">
        <img
          src={model.image}
          alt={model.name}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />

        <h2 className="text-3xl font-bold mb-2">{model.name}</h2>

        <p><strong>Framework:</strong> {model.framework}</p>
        <p><strong>Use Case:</strong> {model.useCase}</p>
        <p><strong>Dataset:</strong> {model.dataset}</p>

        <p className="mt-4">{model.description}</p>

        <p className="mt-4 text-sm">
          Created by: <span className="font-semibold">{model.createdBy}</span>
        </p>

        <p className="text-sm">Purchased: {model.purchased || 0} times</p>

        <div className="mt-6 flex gap-4 flex-wrap">
          {!isCreator && (
            <button
              onClick={handlePurchase}
              className="px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-semibold"
            >
              Purchase Model
            </button>
          )}

          {isCreator && (
            <>
              <button
                onClick={() => navigate(`/update-model/${model._id}`)}
                className="px-5 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-semibold"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-semibold"
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
