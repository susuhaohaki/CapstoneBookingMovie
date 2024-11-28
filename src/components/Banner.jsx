import React from "react";

const Banner = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
      {/* Background Image */}
      <img
        src="https://genk.mediacdn.vn/2019/5/24/avengers-endgame-iron-man-tony-stark-inifinity-stones-uhdpapercom-8k-165-1558684118519907299818.jpg" 
        alt="Banner"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-orange-500 mb-4">
          Welcome to Our Movie Platform
        </h1>
        <p className="text-gray-200 text-sm md:text-lg lg:text-xl max-w-2xl mb-6">
          Discover the latest movies, watch trailers, and book your tickets
          effortlessly.
        </p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg text-sm md:text-lg font-semibold hover:bg-orange-600 transition">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Banner;