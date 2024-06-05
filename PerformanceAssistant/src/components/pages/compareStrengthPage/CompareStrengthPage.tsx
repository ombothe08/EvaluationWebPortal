import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Assuming your interface definitions are in a file named interfaces.ts
import { BatchAnalysisModel } from "../../../model/evaluationData";

const CompareStrengthPage: React.FC = () => {
  const teamName = "Code Monks";

  // State to store the fetched data
  const [analysisData, setAnalysisData] = useState<BatchAnalysisModel | null>(null);

  useEffect(() => {
    // Simulating fetching data from an API endpoint
    const fetchData = async () => {
      try {
        // Replace this with your actual fetch call
        const response = await fetch("http://localhost:3000/evaluate");
        const data: BatchAnalysisModel = await response.json();
        setAnalysisData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch function
    fetchData();
  }, []);

  // Function to generate chart data from fetched data
  const generateChartData = () => {
    if (!analysisData || !analysisData.BatchData.CandidateStrengthAnalysis) {
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

    const candidates = analysisData.BatchData.CandidateStrengthAnalysis.Data;
    console.log(candidates);
    const data = {
      labels: candidates.map(candidate => candidate.Name),
      datasets: [{
        label: 'Strength',
        data: candidates.map(candidate => candidate.Strength),
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
        min: 0, // Minimum value for y-axis
        max: 100, // Maximum value for y-axis
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
