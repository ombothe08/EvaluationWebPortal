import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useLocation } from "react-router-dom"; // Import useLocation
import Navbar from "../Navbar";
import { ServerData } from "../../../model/evaluationData";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DetailedInsightsPage: React.FC = () => {
  const location = useLocation(); // Use useLocation hook to get the data passed from ParameterListPage
  const { data } = location.state as { data: ServerData };


  console.log(data);

  const generateChartData = () => {
    if (!data || data.BatchData.CandidateStrengthAnalysis.Data.length === 0) {
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

    const dataToDisplay = {
      labels: data.BatchData.CandidateStrengthAnalysis.Data.map((item: any) => item.Name), // Using 'Name' as labels
      datasets: [{
        label: 'Strength',
        data: data.BatchData.CandidateStrengthAnalysis.Data.map((item: any) => item.Strength), // Using 'Strength' as data values
        backgroundColor: `rgba(54, 162, 235, 0.2)`,
        borderColor: `rgba(54, 162, 235, 1)`,
        borderWidth: 1,
      }],
    };


    console.log(dataToDisplay);

    return dataToDisplay;
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
    <Box>
      <Navbar />
      <Box
        component={Paper}
        sx={{
          p: 5,
          borderRadius: 2,
          boxShadow: 3,
          m: 5,
          backgroundColor: "aliceblue",
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
          Strength Analysis Report
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
        </Typography>

        <Bar data={generateChartData()} options={options} />
      </Box>
     </Box>

  );
};

export default DetailedInsightsPage;
