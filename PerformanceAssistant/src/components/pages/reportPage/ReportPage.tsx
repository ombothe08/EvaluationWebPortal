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

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
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
// import { BatchAnalysisModel } from "../../../model/evaluationData";

const ReportPage: React.FC = () => {
  //const [batchData, setBatchData] = useState<BatchAnalysisModel | null>(null);
  const location = useLocation();
  const { data } = location.state as { data: any } || {}; // Get data from the router state

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
          Team Performance Report for {data.Name}
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
          Module: {data.Module}
        </Typography>
        <br></br>
        <div>
        {data && (
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
     {data.CandidateAnalysisModel.map((candidate: any, index: any) => (
       <TableRow key={index}>
         <TableCell sx={{ padding: "8px", border: "1px solid black" }}>
           {candidate.Name}
         </TableCell>
         <TableCell
           sx={{
             backgroundColor: "palegreen",
             padding: "8px",
             border: "1px solid black",
           }}
         >
           {candidate.Strengths.map((strength: any, id: any) => (
             <div key={id}>
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
           {candidate.AreasOfImprovement.map((area: any, id: any) => (
             <div key={id}>
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
           {candidate.InputForMentors.map((input: any, id: any) => (
             <div key={id}>
               {input.Parameter}: {input.Data}
             </div>
           ))}
         </TableCell>
       </TableRow>
     ))}
     <TableRow>
       <TableCell /> {/* Empty cell for alignment */}
       <TableCell sx={{ textAlign: "center" }}>
         <Button variant="contained" color="primary">
           Compare Strengths
         </Button>
       </TableCell>
       <TableCell sx={{ textAlign: "center" }}>
         <Button variant="contained" color="secondary">
           Compare Improvements
         </Button>
       </TableCell>
       <TableCell /> {/* Empty cell if needed */}
     </TableRow>
   </TableBody>
 </Table>
</TableContainer>
        )}
        </div>
       
      </Box>
    </Box>
  );
};

export default ReportPage;