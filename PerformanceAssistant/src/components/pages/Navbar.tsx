import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CCTech from "../images/CCTech.png";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { pink } from "@mui/material/colors";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

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
        <div style={{ marginLeft: 'auto' }}>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => navigate("/homepage")}
          >
            <HomeIcon sx={{ fontSize: '50px' }} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
