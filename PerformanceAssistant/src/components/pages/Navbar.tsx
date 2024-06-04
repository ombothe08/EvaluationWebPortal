import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CCTech from "../images/CCTech.png";

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
      <Toolbar>
        <div style={{ marginTop: 10, marginBottom: -10 }}>
          <img
            src={CCTech}
            alt="CCTech Logo"
            className="mb-8"
            style={{ width: "60px", height: "60px" }}
          />
        </div>
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
