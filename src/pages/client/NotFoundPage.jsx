import { NavLink } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
      {/* Icon */}
      <div className="mb-4 text-6xl text-red-500">
        <i className="fas fa-exclamation-triangle"></i>
      </div>
      {/* Title */}
      <h1 className="mb-2 text-4xl font-bold">Oops! Page Not Found</h1>
      {/* Description */}
      <p className="mb-6 text-lg text-gray-600">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      {/* Back to Home Button */}
      <NavLink
        to="/"
        className="inline-block rounded-md bg-blue-500 px-6 py-3 text-lg font-medium text-white shadow-md transition duration-200 hover:bg-blue-600"
      >
        <i className="fas fa-home mr-2"></i> Back to Home
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
