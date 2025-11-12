import React from "react";
import { useNavigate } from "react-router";
import errorImg from "../../assets/Error.webp";

const ErrorElement = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white p-6">
      {/* Error Image */}
      <img
        src={errorImg}
        alt="Error"
        className="w-80 md:w-96 mb-6 animate-bounce"
      />

      {/* Error Text */}
      <h1 className="text-xl md:text-4xl font-bold mb-3">404 | Page Not Found</h1>
      <p className="text-white/80 text-center max-w-md mb-6">
        Oops! The page you are looking for doesn’t exist or might have been moved.
      </p>

      {/* Go Back Button */}
      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default ErrorElement;
