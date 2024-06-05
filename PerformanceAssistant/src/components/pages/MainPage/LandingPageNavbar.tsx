import React, { useRef } from "react";
import CCTech from "../../images/CCTech.png";

const Navbar = ({ onLoginClick }) => {
  const loginButtonRef = useRef(null);

  const handleLoginClick = () => {
    if (loginButtonRef.current) {
      const buttonRect = loginButtonRef.current.getBoundingClientRect();
      onLoginClick(buttonRect);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg py-4 fixed w-full z-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex-grow flex justify-center items-center">
          <img
            src={CCTech}
            alt="Logo"
            className="w-16 h-16 rounded-full mr-3 shadow-lg"
          />
          <div
            className="text-3xl font-extrabold text-white tracking-wide"
            style={{ fontSize: 50 }}
          >
            Performance Assistant
          </div>
        </div>
        <button
          ref={loginButtonRef}
          onClick={handleLoginClick}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
          style={{ fontSize: "1.25rem" }}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
