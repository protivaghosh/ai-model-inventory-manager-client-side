import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Skeleton = () => (
  <div className="animate-pulse bg-base-200 h-80 rounded-xl"></div>
);

const LatestModel = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ai-model-manager.vercel.app/latest-models")
      .then(res => res.json())
      .then(data => {
        setModels(data);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-4xl font-bold text-center mb-10">Latest Models</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? [...Array(4)].map((_, i) => <Skeleton key={i} />)
          : models.map(model => (
              <div key={model._id} className="bg-base-200 p-4 rounded-xl shadow h-full flex flex-col">
                <img src={model.image} className="h-40 object-cover rounded mb-3" />
                <h3 className="font-bold">{model.name}</h3>
                <p className="text-sm flex-grow">{model.description}</p>
                <Link to={`/models/${model._id}`} className="btn btn-primary mt-4">
                  View Details
                </Link>
              </div>
            ))}
      </div>
    </section>
  );
};

export default LatestModel;
