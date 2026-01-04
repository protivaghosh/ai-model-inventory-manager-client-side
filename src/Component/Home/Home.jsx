import Banner from "../Banner/Banner";
import LatestModel from "../LatestModel/LatestModel";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-base-100 text-base-content">

      {/* 1. Hero */}
      <Banner />

      {/* 2. Latest Models */}
      <LatestModel />

      {/* 3. About */}
      <section className="max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">About AI Model Inventory</h2>
        <p className="text-lg">
          Manage, explore, and track AI models efficiently with a modern and secure platform.
        </p>
      </section>

      {/* 4. Features */}
      <section className="bg-base-200 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-4 text-center">
          {["Secure Auth", "Model Tracking", "Cloud Ready", "Fast Search"].map(f => (
            <div key={f} className="p-6 bg-base-100 rounded-xl shadow">
              <h3 className="font-bold text-xl">{f}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 5. How it Works */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {["Register", "Add Model", "Manage", "Explore"].map(step => (
            <div key={step} className="p-6 bg-base-200 rounded-xl">
              <h3 className="font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Statistics */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          <div><h3 className="text-3xl font-bold">120+</h3><p>Models</p></div>
          <div><h3 className="text-3xl font-bold">80+</h3><p>Users</p></div>
          <div><h3 className="text-3xl font-bold">10+</h3><p>Frameworks</p></div>
          <div><h3 className="text-3xl font-bold">99%</h3><p>Uptime</p></div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">What Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-base-200 rounded-xl">“Very professional platform.”</div>
          <div className="p-6 bg-base-200 rounded-xl">“Easy to manage models.”</div>
          <div className="p-6 bg-base-200 rounded-xl">“Perfect for AI projects.”</div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-base-200 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">FAQ</h2>
          <div className="space-y-4">
            <div className="p-4 bg-base-100 rounded">Is login required? — Yes</div>
            <div className="p-4 bg-base-100 rounded">Can I add models? — Yes</div>
          </div>
        </div>
      </section>

      {/* 9. Newsletter */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <input type="email" placeholder="Enter email" className="input input-bordered w-72" />
      </section>

      {/* 10. CTA */}
      <section className="bg-primary py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Get Started Today</h2>
        <Link to="/register" className="btn btn-secondary">Register Now</Link>
      </section>

    </div>
  );
};

export default Home;
