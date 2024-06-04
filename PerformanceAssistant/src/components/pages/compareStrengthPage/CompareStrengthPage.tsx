import React from "react";
import Navbar from "../Navbar";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportPage: React.FC = () => {
  const teamName = "Code Monks";

  const generateRandomData = () => {
    const candidates = [
      "John Doe",
      "Jane Smith",
      "Alice Johnson",
      "Bob Brown",
      "Charlie Davis"
    ];
    const strengths = [
      "Leadership",
      "Communication",
      "Problem-Solving",
      "Creativity",
      "Teamwork",
      "Adaptability"
    ];

    return candidates.map(candidate => ({
      name: candidate,
      strengths: strengths.map(strength => ({
        parameter: strength,
        data: Math.floor(Math.random() * 101)
      }))
    }));
  };

  const candidates = generateRandomData();

  const data = {
    labels: candidates.map(candidate => candidate.name),
    datasets: candidates[0].strengths.map((strength, index) => ({
      label: strength.parameter,
      data: candidates.map(candidate => candidate.strengths[index].data),
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
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

        <Bar data={data} options={options} />
      </Box>
    </Box>
  );
};

export default ReportPage;


// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar";
// import { Box, Typography, Paper } from "@mui/material";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import axios from 'axios';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ReportPage: React.FC = () => {
//   const teamName = "Code Monks";
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post('/evaluate/strengths', {
//           // Add your payload here. Example:
//           Name: "Team Strength Analysis",
//           Strengths: [
//             { Parameter: "Leadership", Data: "Excellent" },
//             { Parameter: "Communication", Data: "Very Good" },
//             { Parameter: "Problem-Solving", Data: "Good" }
//           ]
//         });

//         const responseData = JSON.parse(response.data);
//         setData(responseData);
//       } catch (error) {
//         console.error("Error fetching the data", error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!data) {
//     return <Typography>Loading...</Typography>;
//   }

//   const chartData = {
//     labels: data.Data.map((candidate: any) => candidate.Name),
//     datasets: [
//       {
//         label: 'Strength',
//         data: data.Data.map((candidate: any) => candidate.Strength),
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       }
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       title: {
//         display: true,
//         text: 'Strength Analysis',
//       },
//     },
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #38ef7d, #11998e)",
//         py: 5,
//       }}
//     >
//       <Navbar />
//       <Box
//         component={Paper}
//         sx={{
//           p: 5,
//           borderRadius: 2,
//           boxShadow: 3,
//           m: 5,
//           backgroundColor: "whitesmoke",
//         }}
//       >
//         <Typography
//           variant="h4"
//           component="h1"
//           sx={{
//             fontSize: 30,
//             fontWeight: "bold",
//             mb: 1,
//             fontFamily: "sans-serif",
//           }}
//         >
//           Evaluation Report
//         </Typography>

//         <Typography
//           variant="h5"
//           component="h2"
//           sx={{
//             fontSize: 25,
//             fontWeight: "bold",
//             mb: 4,
//             fontFamily: "sans-serif",
//           }}
//         >
//           Team: {teamName}
//         </Typography>

//         <Bar data={chartData} options={options} />
//       </Box>
//     </Box>
//   );
// };

// export default ReportPage;
