// import React, { ChangeEvent, useState } from "react";
// import Navbar from "../Navbar";
// import {
//   Box,
//   Button,
//   IconButton,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {UseExcelParametersReturn} from "../uploadFilePage/UseExcelParametersReturn";
// import { useNavigate } from "react-router-dom";
// import { Upload } from "@mui/icons-material";

// interface HomePageProps {
//   useExcelParameters: UseExcelParametersReturn; // Pass UseExcelParametersReturn as a prop
// }

// const HomePage: React.FC<HomePageProps> = ({ useExcelParameters }) => {
//   const navigate = useNavigate(); // Initialize navigate function
//   const [file, setFile] = useState<File | null>(null);
//   const [homepageData, setHomepageData] = useState([
//     {
//       analysis: "Om 1",
//       date: "3-10-2000",
//       operation: "",
//     },
//   ]);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       useExcelParameters.handleFileUpload(event);
//       navigate('/upload');
//       setFile(event.target.files[0]);
//     }
//   };

//   const handleUploadClick = () => {
//     const fileInput = document.getElementById("fileInput") as HTMLInputElement;
//     if (fileInput) {
//       fileInput.click();
//     }
//   };

//   const handleDelete = (index: number) => {
//     const updatedData = homepageData.filter((_, i) => i !== index);
//     setHomepageData(updatedData);
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(to right, #38ef7d, #11998e)",
//         py: 5,
//       }}
//     >
//       <Navbar />

//       <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//         <Button
//           variant="contained"
//           color="warning"
//           sx={{ fontSize: "1.25rem", py: 2, px: 4 }}
//           onClick={handleUploadClick}
//         >
//           Upload data to analysis
//         </Button>
//       </Box>

//       <input
//         type="file"
//         id="fileInput"
//         className="hidden"
//         onChange={handleFileChange}
//         style={{ display: "none" }}
//       />

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
//                     width: "45%",
//                   }}
//                 >
//                   Analysis
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "papayawhip",
//                     fontSize: 25,
//                     fontWeight: "bold",
//                     border: "1px solid black",
//                     width: "45%",
//                   }}
//                 >
//                   Date
//                 </TableCell>
//                 <TableCell
//                   sx={{
//                     backgroundColor: "papayawhip",
//                     fontSize: 25,
//                     fontWeight: "bold",
//                     border: "1px solid black",
//                     width: "10%",
//                   }}
//                 >
//                   Operation
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {homepageData.map((candidate, index) => (
//                 <TableRow key={index}>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "white",
//                       border: "1px solid black",
//                       padding: "8px",
//                       width: "33.33%",
//                     }}
//                   >
//                     {candidate.analysis}
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "white",
//                       border: "1px solid black",
//                       padding: "8px",
//                       width: "33.33%",
//                     }}
//                   >
//                     {candidate.date}
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       backgroundColor: "white",
//                       border: "1px solid black",
//                       padding: "8px",
//                       width: "33.33%",
//                     }}
//                   >
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDelete(index)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
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

// export default HomePage;




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
import { UseExcelParametersReturn } from "../uploadFilePage/UseExcelParametersReturn";
import { useNavigate } from "react-router-dom";
import { Upload } from "@mui/icons-material";
import { ServerData } from "../../../model/evaluationData";

interface HomePageProps {
  useExcelParameters: UseExcelParametersReturn; // Pass UseExcelParametersReturn as a prop
}

// interface ServerData {
//   objectid: string;
//   BatchData: {
//     Date: string;
//     // other fields...
//   };
// }

const HomePage: React.FC<HomePageProps> = ({ useExcelParameters }) => {
  const navigate = useNavigate(); // Initialize navigate function
  const [file, setFile] = useState<File | null>(null);
  const [homepageData, setHomepageData] = useState<ServerData[]>([]);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/batchdata"); // Replace with your server endpoint
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
      useExcelParameters.handleFileUpload(event);
      navigate("/upload");
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
    // Implement the logic for downloading the data here
    console.log(`Download clicked for index ${index}`);
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
                  Analysis (Object ID)
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
              {homepageData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell
                    sx={{
                      backgroundColor: "white",
                      border: "1px solid black",
                      padding: "8px",
                    }}
                  >
                    {data.objectid}
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
