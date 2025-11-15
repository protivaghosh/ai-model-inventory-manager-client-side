import React from "react";
import { Link } from "react-router-dom"; // ✔️ FIXED IMPORT
import { FaGithub, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-300 border-t border-white/10 backdrop-blur-xl w-full">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Logo / Title */}
        <div className="text-center md:text-left">
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            AI Model Inventory
          </Link>
          <p className="text-gray-600 mt-1 italic">
            Manage and track your AI models efficiently.
          </p>
        </div>

        {/* Center: Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-600 hover:text-purple-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/add-model"
            className="text-gray-600 hover:text-purple-400 transition-colors duration-200"
          >
            Add Model
          </Link>
          <Link
            to="/models"
            className="text-gray-600 hover:text-purple-400 transition-colors duration-200"
          >
            All Models
          </Link>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-purple-400 transition-colors duration-200"
          >
            GitHub
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 hover:text-purple-400 transition-colors text-xl"
          >
            <FaGithub />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 hover:text-purple-400 transition-colors text-xl"
          >
            <FaFacebook />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 hover:text-purple-400 transition-colors text-xl"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Divider Line */}
      <hr className="border-t border-gray-300 mx-auto w-[90%]" />

      {/* Bottom Copyright */}
      <div className="text-center text-gray-600 text-sm py-4">
        © {new Date().getFullYear()} All Rights Reserved.
      </div>

      {/* Bottom Glow Bar */}
      <div className="h-[3px] bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"></div>
    </footer>
  );
};

export default Footer;
