import React, { useState } from "react";
import { Link } from "react-router-dom";
import CCTech from "../../images/CCTech.png";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg py-4 fixed w-full z-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={CCTech}
            alt="Logo"
            className="w-16 h-16 rounded-full mr-3 shadow-lg"
            style={{ marginLeft: "-120px" }}
          />
          <div
            className="text-3xl font-extrabold text-white tracking-wide"
            style={{ fontSize: 50 }}
          >
            Performance Assistant
          </div>
        </div>
        <div
          className="hidden md:flex space-x-8"
          style={{ marginRight: "-120px" }}
        >
          <Link
            to="/about"
            className="text-white hover:text-yellow-300 font-medium transition-colors duration-300"
            style={{ fontSize: "1.5rem" }}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-yellow-300 font-medium transition-colors duration-300"
            style={{ fontSize: "1.5rem" }}
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
            style={{ fontSize: "1.25rem" }}
          >
            Login
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg rounded-lg mt-2">
          <Link
            to="/about"
            className="block text-white hover:text-yellow-300 px-4 py-2 transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block text-white hover:text-yellow-300 px-4 py-2 transition-colors duration-300"
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className="block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg mx-4 my-2 hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
          >
            Signup/Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
