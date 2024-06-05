import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { ServerData } from "../../../model/evaluationData";

const ReportPage: React.FC = () => {
  const location = useLocation();
  const { data } = location.state as { data: ServerData };

  return (
    <Box>
      <Navbar />
      <Box
        component={Paper}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          m: 4,
          backgroundColor: "aliceblue",
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
          Team Performance Report for {data.BatchData.Name}
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontSize: 20,
            fontWeight: "bold",
            mb: 3,
            fontFamily: "sans-serif",
          }}
        >
          Module: {data.BatchData.Module || "N/A"}
        </Typography>

        <TableContainer sx={{ maxHeight: "60vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "papayawhip" }}>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 18,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  Candidate Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 18,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  Strengths
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 18,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  Areas of Improvement
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 18,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  Input for Mentors
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.BatchData.AnalysisModel.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "15px",
                    }}
                  >
                    {candidate.Name}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "palegreen",
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "15px",
                    }}
                  >
                    {candidate.Strengths.map((strength, index) => (
                      <div key={index}>
                        {strength.Parameter}: {strength.Data}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "pink",
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "15px",
                    }}
                  >
                    {candidate.AreasOfImprovement.map((improvement, index) => (
                      <div key={index}>
                        {improvement.Parameter}: {improvement.Data}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "skyblue",
                      border: "1px solid black",
                      padding: "8px",
                      fontSize: "15px",
                    }}
                  >
                    {candidate.InputForMentors.map((input, index) => (
                      <div key={index}>
                        {input.Parameter}: {input.Data}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <br></br>
                  <center>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ fontSize: "15px" }}
                    >
                      Compare Strengths
                    </Button>
                  </center>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ReportPage;
