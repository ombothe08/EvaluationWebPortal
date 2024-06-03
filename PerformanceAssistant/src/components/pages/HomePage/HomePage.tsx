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
import DownloadIcon from "@mui/icons-material/Download";
import { UseExcelParametersReturn } from "../uploadFilePage/UseExcelParametersReturn";
import { useNavigate } from "react-router-dom";
import { Upload } from "@mui/icons-material";
import * as XLSX from 'xlsx';

// Define an interface for the analyzedData object
interface AnalyzedData {
  CandidateName: string;
  Strengths: { Parameter: string; Data: string }[];
  AreasOfImprovement: { Parameter: string; Data: string }[];
  InputForMentore: { Parameter: string; Data: string }[];
}

// Define an interface for the report object
interface Report {
  name: string;
  module: string;
  Date: string;
  analyzedData: AnalyzedData[];
}

// Define an interface for the entire data structure
interface Data {
  _id: { $oid: string };
  report: Report;
}

// Assuming you have the data as a variable called 'myData' of type 'Data'
const myData: Data = {
  "_id": {
    "$oid": "665d73f74948933eb9e9225d"
  },
  "report": {
    "name": "Quarterly Performance Analysis",
    "module": "Sales",
    "Date": "2023-04-01",
    "analyzedData": [
      {
        "CandidateName": "John Doe",
        "Strengths": [
          {
            "Parameter": "Communication",
            "Data": "Excellent"
          },
          {
            "Parameter": "Sales Skills",
            "Data": "Very Good"
          }
        ],
        "AreasOfImprovement": [
          {
            "Parameter": "Time Management",
            "Data": "Needs Improvement"
          }
        ],
        "InputForMentore": [
          {
            "Parameter": "Focus on advanced sales techniques",
            "Data": "Recommend attending advanced sales training sessions."
          }
        ]
      },
      {
        "CandidateName": "Jane Smith",
        "Strengths": [
          {
            "Parameter": "Customer Service",
            "Data": "Outstanding"
          },
          {
            "Parameter": "Product Knowledge",
            "Data": "Excellent"
          }
        ],
        "AreasOfImprovement": [
          {
            "Parameter": "Punctuality",
            "Data": "Needs Improvement"
          }
        ],
        "InputForMentore": [
          {
            "Parameter": "Time Management Workshops",
            "Data": "Encourage participation in time management workshops."
          }
        ]
      }
    ]
  }
}

// Print the report name
// console.log("Report Name:", myData.report.name);

// Loop through analyzedData and print details for each candidate
// for (const candidate of myData.report.analyzedData) {
//   console.log("Candidate Name:", candidate.CandidateName);
//   console.log("Strengths:");
//   for (const strength of candidate.Strengths) {
//     console.log(`  * ${strength.Parameter}: ${strength.Data}`);
//   }
//   console.log("Areas of Improvement:");
//   for (const improvement of candidate.AreasOfImprovement) {
//     console.log(`  * ${improvement.Parameter}: ${improvement.Data}`);
//   }
//   console.log("Input for Mentor:");
//   for (const input of candidate.InputForMentore) {
//     console.log(`  * ${input.Parameter}: ${input.Data}`);
//   }
//   console.log("---"); // Separator between candidates
// }

const convertDataToExcel = (data:number) => {
  const worksheet = XLSX.utils.json_to_sheet(myData.report.analyzedData);
const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, worksheet, "Report Data");

const fileName:string = myData.report.name;
XLSX.writeFile(workbook, fileName+".xlsx");

}; 


interface HomePageProps {
  useExcelParameters: UseExcelParametersReturn; // Pass UseExcelParametersReturn as a prop
}
 
const HomePage: React.FC<HomePageProps> = ({ useExcelParameters }) => {
  const navigate = useNavigate(); // Initialize navigate function
  const [file, setFile] = useState<File | null>(null);
  const [homepageData, setHomepageData] = useState([
    {
      analysis: "Om 1",
      date: "3-10-2000",
      operation: "",
    },
  ]);

  
 
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      useExcelParameters.handleFileUpload(event);
      navigate('/upload');
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
 
  const handleDownload = (index: number) => {
    convertDataToExcel(index);
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
                  Operation
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
              {homepageData.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {candidate.analysis}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {candidate.date}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
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
 
 


