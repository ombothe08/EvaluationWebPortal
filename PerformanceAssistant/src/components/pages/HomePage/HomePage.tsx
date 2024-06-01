import React, { ChangeEvent, useState } from "react";
import Navbar from "../Navbar";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const HomePage: React.FC = () => {
  const {
    handleFileUpload
      } = useExcelParameters();

  const [file, setFile] = useState<File | null>(null);
  const [homepageData, setHomepageData] = useState([
    {
      analysis: "Om 1",
      date: "3-10-2000",
      operation: "",
    },
    // Add more candidate data as needed
  ]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFileUpload(event);
      setFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDelete = (index: number) => {
    const updatedData = homepageData.filter((_, i) => i !== index);
    setHomepageData(updatedData);
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

      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Button
          variant="contained"
          color="warning"
          sx={{ fontSize: "1.25rem", py: 2, px: 4 }}
          onClick={handleUploadClick}
        >
          Upload data to analysis
        </Button>
      </Box>

      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

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
                    width: "45%",
                  }}
                >
                  Analysis
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                    width: "45%",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                    width: "10%",
                  }}
                >
                  Operation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {homepageData.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                      width: "33.33%",
                    }}
                  >
                    {candidate.analysis}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                      width: "33.33%",
                    }}
                  >
                    {candidate.date}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                      width: "33.33%",
                    }}
                  >
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
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

export default HomePage;