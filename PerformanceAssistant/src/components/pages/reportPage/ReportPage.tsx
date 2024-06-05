import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";
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
import { BatchAnalysisModel } from "../../../model/evaluationData";

const ReportPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { apiResponseData } = location.state as {
    apiResponseData: BatchAnalysisModel;
  };

  const handleCompareStrengths = () => {
    // Redirect to compareStrengthPage
    navigate("/compare-strengths");
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
          Team Performance Report for {apiResponseData?.BatchData.Name}
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
          Module: {apiResponseData?.BatchData.Module}
        </Typography>

        <TableContainer sx={{ maxHeight: "70vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow sx={{ backgroundColor: "papayawhip" }}>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontSize: 25,
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Candidate Name
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontSize: 25,
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Strengths
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontSize: 25,
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Areas of Improvement
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      fontSize: 25,
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Input for Mentors
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiResponseData?.BatchData.AnalysisModel.map(
                (candidate, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        backgroundColor: "white",
                        border: "1px solid black",
                        padding: "8px",
                        fontSize: "18px",
                      }}
                    >
                      {candidate.Name}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "palegreen",
                        border: "1px solid black",
                        padding: "8px",
                        fontSize: "18px",
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
                        border: "1px solid black",
                        padding: "8px",
                        fontSize: "18px",
                      }}
                    >
                      {candidate.AreasOfImprovement.map((strength, idx) => (
                        <div key={idx}>
                          {strength.Parameter}: {strength.Data}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "skyblue",
                        border: "1px solid black",
                        padding: "8px",
                        fontSize: "18px",
                      }}
                    >
                      {candidate.InputForMentors.map((strength, idx) => (
                        <div key={idx}>
                          {strength.Parameter}: {strength.Data}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>
                )
              )}
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <br></br>
                  <center>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ fontSize: "18px" }}
                      onClick={handleCompareStrengths}
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
