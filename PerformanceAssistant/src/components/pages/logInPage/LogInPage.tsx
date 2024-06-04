import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CCTech from "../../images/CCTech.png";

const LoginPage: React.FC = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin: () => Promise<void> = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email, Password }),
      });
      
      const data = await response.json();
      
      if (data) 
      {
        navigate("/homepage"); 
      }
      else 
      {
        setError("Incorrect Email or Password");
      }
    } catch (error) 
    {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <img
        src={CCTech}
        alt="CCTech Logo"
        className="mb-8"
        style={{ width: "150px", height: "auto" }}
      />
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="w-64 mb-4">
        <input
          type="Email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-64 mb-4">
        <input
          type="Password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="w-64 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
