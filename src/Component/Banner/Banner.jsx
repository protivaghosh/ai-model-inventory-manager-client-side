import React, { useState } from "react";
import { motion } from "framer-motion";

const Banner = () => {
  const images = [
    {
      id: 1,
      url: "https://www.mindinventory.com/blog/wp-content/uploads/2024/07/how-to-build-an-ai-model.webp",
      title: "Manage Your AI Models Efficiently",
      desc: "Track frameworks, datasets, and performance in one place.",
    },
    {
      id: 2,
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4sJ4NbTe3iQA1tAHPWv6ZVdJY38HCv7NGMg&s",
      title: "Organize, Update, and Share Models",
      desc: "Keep your AI projects structured and accessible.",
    },
    {
      id: 3,
      url: "https://p3adaptive.com/wp-content/uploads/2025/08/What-Are-Some-Examples-Of-Using-AI-To-Simplify-Data-Management-And-Analysis-1.jpeg",
      title: "Simplify AI Model Management",
      desc: "Your all-in-one AI model inventory dashboard.",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(images[0]);

  return (
    <div className="relative w-full h-[80vh] md:h-[90vh]  overflow-hidden">
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${activeSlide.url})`,
        }}
      ></div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <motion.h1
          key={activeSlide.id + "-title"}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xl sm:text-2xl md:text-5xl font-bold lg:mb-3 drop-shadow-lg"
        >
          {activeSlide.title}
        </motion.h1>

        <motion.p
          key={activeSlide.id + "-desc"}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="text-sm sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-4"
        >
          {activeSlide.desc}
        </motion.p>

        <motion.button
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="btn btn-outline border-purple-400 text-purple-300 hover:bg-purple-500 hover:text-white px-2 py-1 lg:px-5 lg:py-2 rounded-lg font-semibold transition-all duration-200"
        >
          Explore Models
        </motion.button>
      </div>

      {/* Thumbnails */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-center gap-2 sm:gap-3 p-2 rounded-2xl backdrop-blur-md bg-black/40">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.title}
            className={`w-12 h-10 sm:w-16 sm:h-12 md:w-20 md:h-14 object-cover rounded-md cursor-pointer border-2 transition-all duration-300 ${
              activeSlide.id === img.id
                ? "border-purple-500 scale-110"
                : "border-transparent opacity-70 hover:opacity-100"
            }`}
            onClick={() => setActiveSlide(img)}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
