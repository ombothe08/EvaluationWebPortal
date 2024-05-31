import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav
      className="max-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        fontSize: 50,
        color: "white",
      }}
    >
      <h2 style={{ fontWeight: "bold", margin: 10 }}>Performance Assistant</h2>
    </nav>
  );
};

export default Navbar;


