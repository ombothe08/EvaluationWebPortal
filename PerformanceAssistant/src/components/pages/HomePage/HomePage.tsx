import React, { ChangeEvent, useEffect, useState } from "react";
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
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate } from "react-router-dom";
import { ServerData } from "../../../model/evaluationData";

interface HomePageProps {
  onfileName: (fileName: File | null) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onfileName }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<string | null>(null);
  const [homepageData, setHomepageData] = useState<ServerData[]>([]);
  const [hfileName, setFileName] = useState<string | null>("om");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/getAllRecords");
        const data: ServerData[] = await response.json();
        setHomepageData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // useExcelParameters.handleFileUpload(event);
      // setFileName(event.target.files[0].name);
      //setFileName(event.target.files[0].name);
      onfileName(event.target.files[0]);
      navigate("/upload");
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleDelete = async (objectid: string) => {
    try {
      const response = await fetch(`http://localhost:3000/delete/${objectid}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedData = homepageData.filter(
          (data) => data.objectid !== objectid
        );
        setHomepageData(updatedData);
      } else {
        console.error(`Failed to delete record with ID ${objectid}`);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const handleDownload = (index: number) => {
    console.log(`Download clicked for index ${index}`);
    // Implement download logic here
  };

  const handleAnalysisClick = async (objectid: string) => {
    try {
      const response = await fetch("http://localhost:3000/getselectedrecord", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ objectid }),
      });
      if (response.ok) {
        const reportData = await response.json();
        navigate("/report", { state: { reportData } });
      } else {
        console.error(`Failed to fetch record with ID ${objectid}`);
      }
    } catch (error) {
      console.error("Error fetching record:", error);
    }
  };

  return (
    <Box>
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
                    width: "30%",
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
                    width: "30%",
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
                    width: "20%",
                  }}
                >
                  Delete
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "papayawhip",
                    fontSize: 25,
                    fontWeight: "bold",
                    border: "1px solid black",
                    width: "20%",
                  }}
                >
                  Download
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {homepageData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleAnalysisClick(data.objectid)}
                  >
                    <span
                      style={{ textDecoration: "underline", color: "blue" }}
                    >
                      {data.BatchData.Name}
                    </span>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {data.BatchData.Date}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(data.objectid)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleDownload(index)}
                    >
                      <DownloadIcon />
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
