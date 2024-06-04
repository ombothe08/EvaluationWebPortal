// import React from "react";
// import Navbar from "../Navbar";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
// } from "@mui/material";

// const ReportPage: React.FC = () => {
//   const teamName = "Code Monks";
//   const candidates = [
//     {
//       name: "Person 1",
//       module: "Module 1",
//       strengths: "Quick Learner",
//       areaOfImprovement: "Communication Skills",
//       inputForMentors: "Needs more practice with presentations",
//     },
//   ];

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

//         <TableContainer sx={{ maxHeight: "70vh" }}>
//           <Table stickyHeader>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "papayawhip" }}>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "papayawhip",
//                     fontSize: 25,
//                     fontWeight: "bold",
//                     border: "1px solid black",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     component="h1"
//                     sx={{
//                       fontSize: 25,
//                       fontWeight: "bold",
//                       fontFamily: "sans-serif",
//                     }}
//                   >
//                     Candidate Name
//                   </Typography>
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "papayawhip",
//                     fontSize: 25,
//                     fontWeight: "bold",
//                     border: "1px solid black",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     component="h1"
//                     sx={{
//                       fontSize: 25,
//                       fontWeight: "bold",
//                       fontFamily: "sans-serif",
//                     }}
//                   >
//                     Module
//                   </Typography>
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "papayawhip",
//                     fontSize: 25,
//                     fontWeight: "bold",
//                     border: "1px solid black",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     component="h1"
//                     sx={{
//                       fontSize: 25,
//                       fontWeight: "bold",
//                       fontFamily: "sans-serif",
//                     }}
//                   >
//                     Strengths
//                   </Typography>
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "papayawhip",
//                     fontSize: 25,
//                     fontWeight: "bold",
//                     border: "1px solid black",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     component="h1"
//                     sx={{
//                       fontSize: 25,
//                       fontWeight: "bold",
//                       fontFamily: "sans-serif",
//                     }}
//                   >
//                     Area of Improvements
//                   </Typography>
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "papayawhip",
//                     fontSize: 25,
//                     fontWeight: "bold",
//                     border: "1px solid black",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     component="h1"
//                     sx={{
//                       fontSize: 25,
//                       fontWeight: "bold",
//                       fontFamily: "sans-serif",
//                     }}
//                   >
//                     Input
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {candidates.map((candidate, index) => (
//                 <TableRow key={index}>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "white",
//                       border: "1px solid black",
//                       padding: "8px",
//                     }}
//                   >
//                     {candidate.name}
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "white",
//                       border: "1px solid black",
//                       padding: "8px",
//                     }}
//                   >
//                     {candidate.module}
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "palegreen",
//                       border: "1px solid black",
//                       padding: "8px",
//                     }}
//                   >
//                     {candidate.strengths}
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "pink",
//                       border: "1px solid black",
//                       padding: "8px",
//                     }}
//                   >
//                     {candidate.areaOfImprovement}
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "skyblue",
//                       border: "1px solid black",
//                       padding: "8px",
//                     }}
//                   >
//                     {candidate.inputForMentors}
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// };

// export default ReportPage;

import React from "react";
import { useLocation } from "react-router-dom";
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
  Button,
} from "@mui/material";
import { BatchAnalysisModel } from '../../../model/evaluationData';

const ReportPage: React.FC = () => {
  const location = useLocation();
  const { apiResponseData } = location.state as { apiResponseData: BatchAnalysisModel };

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
          Team: {apiResponseData.BatchData.Name}
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
                    Score
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
    
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ReportPage;