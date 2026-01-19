import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero_bg.png';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Calculate mouse position relative to the window center
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize values between -1 and 1
    const x = (clientX - innerWidth / 2) / (innerWidth / 2);
    const y = (clientY - innerHeight / 2) / (innerHeight / 2);

    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-white">
      {/* Interactive Hero Section */}
      <div
        className="relative h-[80vh] overflow-hidden flex items-center justify-center bg-gray-900"
        onMouseMove={handleMouseMove}
      >
        {/* Parallax Background Layer */}
        <div
          className="absolute inset-0 transition-transform duration-100 ease-out will-change-transform"
          style={{
            transform: `translate3d(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px, 0) scale(1.1)`
          }}
        >
          <img
            src={heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-80"
          />
          {/* subtle gradient overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent"></div>
        </div>

        {/* Glassmorphism Content Card */}
        <div
          className="relative z-10 p-12 max-w-4xl mx-4 text-center rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl transition-transform duration-300 hover:scale-[1.01]"
          style={{
            transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0)`
          }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight drop-shadow-2xl">
            Elevate Your Style
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            Experience the new standard in luxury fashion. curated collections for the modern individual.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/shop?category=Ladies"
              className="group relative px-10 py-4 bg-white text-gray-900 rounded-full font-bold overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            >
              <span className="relative z-10 group-hover:text-indigo-600 transition-colors">Shop Ladies</span>
            </Link>

            <Link
              to="/shop?category=Gents"
              className="group relative px-10 py-4 bg-indigo-600/90 text-white rounded-full font-bold overflow-hidden backdrop-blur-sm border border-indigo-400/30 transition-all hover:bg-indigo-600 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]"
            >
              <span className="relative z-10">Shop Gents</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;