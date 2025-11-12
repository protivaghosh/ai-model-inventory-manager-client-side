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
      .then(res => res.json())
      .then(data => {
        if (data.createdBy !== user.email) {
          toast.error("You are not authorized to edit this model!");
          navigate(-1); // go back
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
  const handleChange = e => {
    setModel({ ...model, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleUpdate = async e => {
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
    return <p className="text-white text-center mt-10 animate-pulse">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <form
        onSubmit={handleUpdate}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-xl w-full text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-300">Update Model</h2>

        <label className="block mb-2 font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={model.name}
          onChange={handleChange}
          className="w-full p-2 rounded-lg mb-4 text-black"
          required
        />

        <label className="block mb-2 font-semibold">Framework</label>
        <input
          type="text"
          name="framework"
          value={model.framework}
          onChange={handleChange}
          className="w-full p-2 rounded-lg mb-4 text-black"
          required
        />

        <label className="block mb-2 font-semibold">Use Case</label>
        <input
          type="text"
          name="useCase"
          value={model.useCase}
          onChange={handleChange}
          className="w-full p-2 rounded-lg mb-4 text-black"
          required
        />

        <label className="block mb-2 font-semibold">Dataset</label>
        <input
          type="text"
          name="dataset"
          value={model.dataset}
          onChange={handleChange}
          className="w-full p-2 rounded-lg mb-4 text-black"
        />

        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          name="description"
          value={model.description}
          onChange={handleChange}
          className="w-full p-2 rounded-lg mb-4 text-black"
          required
        />

        <label className="block mb-2 font-semibold">Image URL</label>
        <input
          type="text"
          name="image"
          value={model.image}
          onChange={handleChange}
          className="w-full p-2 rounded-lg mb-4 text-black"
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 py-2 rounded-lg font-semibold transition-all"
        >
          Update Model
        </button>
      </form>
    </div>
  );
};

export default UpdateModel;
