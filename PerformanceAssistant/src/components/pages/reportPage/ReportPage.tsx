import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { BatchAnalysisModel } from "../../../model/evaluationData";

const ReportPage: React.FC = () => {
  const [batchData, setBatchData] = useState<BatchAnalysisModel | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/evaluate")
      .then((response) => response.json())
      .then((data) => setBatchData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
          Team Performance Report for {batchData?.BatchData.Name}
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: 25,
            fontWeight: "bold",
            mb: 1,
            fontFamily: "sans-serif",
          }}
        >
          Module: {batchData?.BatchData.Name}
        </Typography>
        <br></br>
        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  Candidate Name
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  Strengths
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  Areas of Improvement
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  Input for Mentors
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {batchData?.BatchData.CandidateAnalysisModel.map(
                (candidate, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{ padding: "8px", border: "1px solid black" }}
                    >
                      {candidate.Name}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "palegreen",
                        padding: "8px",
                        border: "1px solid black",
                      }}
                    >
                      {candidate.Strengths.map((strength, idx) => (
                        <div key={idx}>
                          {strength.Parameter}: {strength.Data}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "pink",
                        padding: "8px",
                        border: "1px solid black",
                      }}
                    >
                      {candidate.AreasOfImprovement.map((area, idx) => (
                        <div key={idx}>
                          {area.Parameter}: {area.Data}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "skyblue",
                        padding: "8px",
                        border: "1px solid black",
                      }}
                    >
                      {candidate.InputForMentors.map((input, idx) => (
                        <div key={idx}>
                          {input.Parameter}: {input.Data}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ReportPage;
