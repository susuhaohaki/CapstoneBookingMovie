import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 text-gray-200 shadow">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <NavLink to="/" className="flex h-16 items-center space-x-2">
          <img
            src="./logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
          <p className="text-xl font-bold text-orange-500 md:hidden lg:inline-block">
            BOOKING TICKET
          </p>
        </NavLink>

        {/* Navigation Links */}
        <div className="hidden space-x-6 md:flex">
          <NavLink to="#" className="hover:text-orange-500">
            Home
          </NavLink>
          <NavLink to="#" className="hover:text-orange-500">
            Showing Movie
          </NavLink>
          <NavLink to="#" className="hover:text-orange-500">
            Coming Movie
          </NavLink>
        </div>

        {/* Sign In/Sign Up */}
        <div className="hidden space-x-4 md:flex">
          <NavLink
            to="/login"
            className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
          >
            Sign In
          </NavLink>
          <NavLink
            to="/register"
            className="rounded border border-orange-500 px-4 py-2 text-orange-500 hover:bg-orange-500 hover:text-white"
          >
            Sign Up
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-2xl text-gray-200 md:hidden"
          onClick={toggleMenu}
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-gray-800 lg:hidden">
          <NavLink
            to="/"
            className="block px-4 py-2 text-gray-200 hover:text-orange-500"
          >
            Home
          </NavLink>
          <NavLink
            to="/movie"
            className="block px-4 py-2 text-gray-200 hover:text-orange-500"
          >
            Showing Movie
          </NavLink>
          <NavLink
            to="/comming"
            className="block px-4 py-2 text-gray-200 hover:text-orange-500"
          >
            Coming Movie
          </NavLink>
          <div className="flex flex-col space-y-2 px-4 py-2">
            <NavLink
              to="/login"
              className="rounded bg-orange-500 px-4 py-2 text-center text-white hover:bg-orange-600"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/register"
              className="rounded border border-orange-500 px-4 py-2 text-center text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
