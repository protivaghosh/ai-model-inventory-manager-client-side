import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const UpdateModel = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [model, setModel] = useState({
    name: "",
    framework: "",
    useCase: "",
    dataset: "",
    description: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch model details
  useEffect(() => {
    fetch(`http://localhost:5000/models/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.createdBy !== user.email) {
          toast.error("You are not authorized to edit this model!");
          navigate(-1);
          return;
        }
        setModel({
          name: data.name,
          framework: data.framework,
          useCase: data.useCase,
          dataset: data.dataset,
          description: data.description,
          image: data.image,
        });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load model");
        setLoading(false);
      });
  }, [id, user.email, navigate]);

  // ✅ Handle form changes
  const handleChange = (e) => {
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/models/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(model),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Model updated successfully!");
        navigate(`/models/${id}`);
      } else {
        toast.error(data.message || "Failed to update model");
      }
    } catch (err) {
      console.error("🔥 Update Error:", err);
      toast.error("Server error, try again later");
    }
  };

  if (loading)
    return (
      <p className="text-white text-center mt-10 animate-pulse">Loading...</p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleUpdate}
        className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-xl w-full text-white shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white drop-shadow-lg">
          ✨ Update Model
        </h2>

        {[
          { label: "Name", name: "name" },
          { label: "Framework", name: "framework" },
          { label: "Use Case", name: "useCase" },
          { label: "Dataset", name: "dataset" },
        ].map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block mb-1 font-semibold text-white/90">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={model[field.name]}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
              required={field.name !== "dataset"}
              placeholder={`Enter ${field.label}`}
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block mb-1 font-semibold text-white/90">
            Description
          </label>
          <textarea
            name="description"
            value={model.description}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
            rows="4"
            placeholder="Write a short description..."
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold text-white/90">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={model.image}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
            placeholder="Paste image URL..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
        >
          Update Model
        </button>
      </form>
    </div>
  );
};

export default UpdateModel;
