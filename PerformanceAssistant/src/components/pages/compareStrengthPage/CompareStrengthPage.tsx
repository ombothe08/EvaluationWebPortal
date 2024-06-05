import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CompareStrengthPage: React.FC = () => {
  const teamName = "Code Monks";
  const location = useLocation();
  const apiResponseData = location.state?.apiResponseData || [];

  const generateChartData = () => {
    if (!apiResponseData || apiResponseData.length === 0) {
      return {
        labels: [],
        datasets: [{
          label: '',
          data: [],
          backgroundColor: '',
          borderColor: '',
          borderWidth: 0,
        }],
      };
    }

    const data = {
      labels: apiResponseData.map((item: any) => item.Name),
      datasets: [{
        label: 'Strength',
        data: apiResponseData.map((item: any) => item.CandidateStrengthAnalysis.Data.map((strengthItem: any) => strengthItem.Strength)),
        backgroundColor: `rgba(54, 162, 235, 0.2)`, // Blue color with opacity
        borderColor: `rgba(54, 162, 235, 1)`, // Solid blue color
        borderWidth: 1,
      }],
    };

    return data;
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Strength Analysis',
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #38ef7d, #11998e)",
        py: 5,
      }}
    >
      <Navbar />
      <Box
        component={Paper}
        sx={{
          p: 5,
          borderRadius: 2,
          boxShadow: 3,
          m: 5,
          backgroundColor: "whitesmoke",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: 30,
            fontWeight: "bold",
            mb: 1,
            fontFamily: "sans-serif",
          }}
        >
          Evaluation Report
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontSize: 25,
            fontWeight: "bold",
            mb: 4,
            fontFamily: "sans-serif",
          }}
        >
          Team: {teamName}
        </Typography>

        <Bar data={generateChartData()} options={options} />
      </Box>
    </Box>
  );
};

export default CompareStrengthPage;
