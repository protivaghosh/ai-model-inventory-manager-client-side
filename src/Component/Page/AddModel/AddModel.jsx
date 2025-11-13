import React, { useContext } from "react";
import { useNavigate } from "react-router";

import toast from "react-hot-toast";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AddModel = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddModel = (e) => {
    e.preventDefault();
    const form = e.target;

    const modelData = {
      name: form.name.value,
      framework: form.framework.value,
      useCase: form.useCase.value,
      dataset: form.dataset.value,
      description: form.description.value,
      image: form.image.value,
      createdBy: user?.email,
    };

    fetch("http://localhost:5000/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modelData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Model added successfully!");
          form.reset();
          navigate("/models");
        } else {
          toast.error(data.message || "Failed to add model");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="w-full max-w-lg bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-6">
          Add New AI Model
        </h2>
        <form onSubmit={handleAddModel} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Model Name (e.g., BERT)"
            className="input input-bordered w-full bg-white/20 text-white placeholder-white/60"
            required
          />
          <input
            type="text"
            name="framework"
            placeholder="Framework (e.g., TensorFlow, PyTorch)"
            className="input input-bordered w-full bg-white/20 text-white placeholder-white/60"
            required
          />
          <input
            type="text"
            name="useCase"
            placeholder="Use Case (e.g., NLP, Vision)"
            className="input input-bordered w-full bg-white/20 text-white placeholder-white/60"
            required
          />
          <input
            type="text"
            name="dataset"
            placeholder="Dataset (e.g., COCO, ImageNet)"
            className="input input-bordered w-full bg-white/20 text-white placeholder-white/60"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered w-full bg-white/20 text-white placeholder-white/60"
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL (from ImgBB)"
            className="input input-bordered w-full bg-white/20 text-white placeholder-white/60"
            required
          />

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
          >
            Add Model
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModel;
