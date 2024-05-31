import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor:
          "linear-gradient(to right, #38ef7d, #11998e, #667eea, #764ba2)",
        margin: 0,
        padding: 0,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          padding: 0,
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", fontSize: 50, color: "white", m: 1 }}
        >
          Performance Assistant
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
