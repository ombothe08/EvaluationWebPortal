import React, { useState } from "react";
import CCTech from "../../images/CCTech.png";
import { TextField, Button, Typography, Box } from "@mui/material";

const LoginPage: React.FC = () => {
<<<<<<< HEAD
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
  

  const handleLogin: () => Promise<void> = async () => {
    
    let UserName = email;
    let Password = password;

=======
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin: () => Promise<void> = async () => {
>>>>>>> a3b6db95346c9c6514589ea274b3c16fb8593c28
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
<<<<<<< HEAD
        
        body: JSON.stringify({ UserName, Password }),
=======
        body: JSON.stringify({ email, password }),
>>>>>>> a3b6db95346c9c6514589ea274b3c16fb8593c28
      });
      console.log("in handlelogin 1");

      const data = await response.json();

      if (data.success) {
        alert("Login successful!");
      } else {
        setError("Incorrect email or password");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img
        src={CCTech}
        alt="CCTech Logo"
        style={{ width: "150px", height: "auto", marginBottom: "8px" }}
      />
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && (
        <Typography variant="body1" color="error" gutterBottom>
          {error}
        </Typography>
      )}
      <Box width="300px" marginBottom="4px">
        <TextField
          fullWidth
          variant="outlined"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Box>
      <Box width="300px" marginBottom="4px">
        <TextField
          fullWidth
          variant="outlined"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
