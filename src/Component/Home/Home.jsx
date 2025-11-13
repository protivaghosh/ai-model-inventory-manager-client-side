import React, { useContext } from 'react';
import Banner from '../Banner/Banner';
import LatestModel from '../LatestModel/LatestModel';
import { Link } from 'react-router';
import { ThemeContext } from "../ThemeContext/ThemeContext";

const Home = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="bg-base-100">
      <Banner />
      <LatestModel />

      {/* About AI Models */}
      <section className={`max-w-6xl mx-auto py-16 px-4 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
        <h2 className="text-3xl font-bold text-center mb-6">About AI Models</h2>
        <p className="text-lg text-center">
          AI models are trained algorithms that can perform tasks like image recognition,
          natural language processing, or predictive analytics. They power applications
          such as chatbots, recommendation systems, autonomous vehicles, and more.
        </p>
      </section>

      {/* Get Started */}
      <section className={`max-w-4xl mx-auto py-16 px-4 text-center ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
        <h2 className="text-3xl font-bold mb-4">Get Started</h2>
        <p className="mb-6 text-lg">
          Register or log in to start managing your AI models efficiently.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-colors text-white"
          >
            Register Now
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition-colors text-white"
          >
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
