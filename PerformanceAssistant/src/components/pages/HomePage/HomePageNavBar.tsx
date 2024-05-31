import React from 'react';

const NavBar: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-lg py-4 fixed w-full z-10 transition-all duration-300 flex justify-center">
      <h1 className="text-white text-4xl font-bold">Performance Assistant</h1>
    </header>
  );
};

export default NavBar;

