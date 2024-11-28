import React from "react";
import { NavLink } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      {/* Icon */}
      <div className="text-6xl text-red-500 mb-4">
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">Oops! Page Not Found</h1>
      {/* Description */}
      <p className="text-lg text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      {/* Back to Home Button */}
      <NavLink
        to="/"
        className="inline-block bg-blue-500 text-white text-lg font-medium py-3 px-6 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
      >
        <i className="fas fa-home mr-2"></i> Back to Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
