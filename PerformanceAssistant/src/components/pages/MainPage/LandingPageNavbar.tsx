import React, { useRef } from "react";
import CCTech from "../../images/CCTech.png";

const Navbar = ({ onLoginClick }: any) => {
  const loginButtonRef = useRef(null);

  const handleLoginClick = () => {
    if (loginButtonRef.current) {
      const buttonRect = loginButtonRef.current.getBoundingClientRect();
      onLoginClick(buttonRect);
    }
  };

  return (
    <nav className="bg-white shadow-lg py-3 fixed w-full z-10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex-grow flex justify-center items-center">
          <img src={CCTech} alt="Logo" className="w-16 h-16 " />
          <div
            className="text-3xl font-extrabold text-blue-600 tracking-wide"
            style={{ fontSize: 50, marginLeft: 15 }}
          >
            Performance Assistant
          </div>
        </div>
        <button
          ref={loginButtonRef}
          onClick={handleLoginClick}
          className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
          style={{ fontSize: "1.25rem" }}
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
