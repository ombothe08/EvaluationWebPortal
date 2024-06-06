import {
  Box,
  Typography,
  Paper,
  alpha,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import { BatchInsightModel } from "../../../model/evaluationData";
import ParameterGraphInsights from "./ParameterGraphInsigths";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DetailedInsightsPage: React.FC = () => {
  const location = useLocation();
  const { data } = location.state as { data: BatchInsightModel };

  console.log(data);

  const generateChartData = () => {
    if (!data) {
      return {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
            backgroundColor: "",
            borderColor: "",
            borderWidth: 0,
          },
        ],
      };
    }

    const dataToDisplay = {
      labels: data.BatchData.insight.Data.map((item: any) => item.Name),
      datasets: [
        {
          label: "Strength",
          data: data.BatchData.insight.Data.map(
            (item: any) => item.CombineStrength
          ),
          backgroundColor: `rgba(54, 162, 235, 0.2)`,
          borderColor: `rgba(54, 162, 235, 1)`,
          borderWidth: 1,
        },
      ],
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
        position: "top" as const,
      },
      title: {
        display: true,
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
        ></Typography>

        <Bar data={generateChartData()} options={options} />
      </Box>

      <Box>
        <ParameterGraphInsights data={data} />
      </Box>

      <Box
        component={Paper}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          m: 4,
          backgroundColor: alpha("#1976D2", 0.1),
          maxWidth: "100vw",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: 24,
            fontWeight: "bold",
            mb: 1,
            fontFamily: "sans-serif",
          }}
        >
          Strength-Oriented Role Recommendation Report
        </Typography>

        <TableContainer sx={{ maxHeight: "55vh", maxWidth: "99vw" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: alpha("#2196F3", 0.9),
                    fontSize: 18,
                    fontWeight: "bold",
                    border: "1px solid black",
                    color: "#ffffff",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: alpha("#2196F3", 0.9),
                    fontSize: 18,
                    fontWeight: "bold",
                    border: "1px solid black",
                    color: "#ffffff",
                  }}
                >
                  Role
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.BatchData.insight.Data.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      backgroundColor: index % 2 === 0 ? "white" : "skyblue",
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "15px",
                    }}
                  >
                    {candidate.Name}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: index % 2 === 0 ? "white" : "skyblue",
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "15px",
                    }}
                  >
                    {candidate.suggestedRole}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DetailedInsightsPage;