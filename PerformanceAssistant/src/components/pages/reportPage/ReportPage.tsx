import React from "react";
import Navbar from "../Navbar";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from '@mui/icons-material/Download';
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


const convertDataToExcel = (data:number) => {
  var headers = [["Candidate Name", "Strengths", "Area of improvements", "Notes from Mentor"]];
  var ws= XLSX.utils.aoa_to_sheet([[]]);
  XLSX.utils.sheet_add_aoa(ws, headers, {origin: "A1"});


let record = myData.report.analyzedData;

for(var i:number= 0;i<record.length;i++) {


  let oneCandidate = [];
  oneCandidate.push(record[i].CandidateName);

  let strengthCell:string =record[i].Strengths[0].Parameter +":"+  record[i].Strengths[0].Data+"\n";
  strengthCell += record[i].Strengths[1].Parameter + ":"+ record[i].Strengths[1].Data;
  oneCandidate.push(strengthCell);

  let improvCell:string = record[i].AreasOfImprovement[0].Parameter + ":"+record[i].AreasOfImprovement[0].Data;
  oneCandidate.push(improvCell);

  let notesCell:String = record[i].InputForMentore[0].Parameter+":"+ record[i].InputForMentore[0].Data;
  oneCandidate.push(notesCell);
  let rowNum:number = i+2;
  XLSX.utils.sheet_add_aoa(ws, [oneCandidate], {origin: "A"+rowNum});
}


  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, ws, "Report Details");
  
  XLSX.writeFile(workbook, "performance_report.xlsx");
  
}; 

const ReportPage: React.FC = () => {
  const teamName = "Code Monks";
  const candidates = [
    {
      name: "Person 1",
      module: "Module 1",
      strengths: "Quick Learner",
      areaOfImprovement: "Communication Skills",
      inputForMentors: "Needs more practice with presentations",
    },
  ];

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
        
        <IconButton onClick={() => handleDownload(0)}>
  <DownloadIcon />
</IconButton>





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
                    Module
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
                    Area of Improvements
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
                    Input
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidates.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {candidate.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {candidate.module}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "palegreen",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {candidate.strengths}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "pink",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {candidate.areaOfImprovement}
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "skyblue",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {candidate.inputForMentors}
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

export default ReportPage;
