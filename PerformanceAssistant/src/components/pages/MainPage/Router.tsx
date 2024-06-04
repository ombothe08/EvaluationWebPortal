// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./LandingPage";
// import LoginPage from "../logInPage/LogInPage";
// import HomePage from "../homePage/HomePage";
// import ParameterListPage from "../parameterListPage/ParameterListPage";
// import ReportPage from "../reportPage/ReportPage";
// // import { BatchAnalysisModel } from "../../../model/evaluationData";

// const AppRouter: React.FC = () => {
//   const [pFileName, setFileName] = useState<File | null>(null);
//   const [reportAPIResponseData, setAPIResponseData] = useState<string | null>(
//     null
//   );

//   const handleAPIData = (apiData: string | null) => {
//     console.log("data: " + apiData);
//     setAPIResponseData(apiData);
//   };

//   const handleFileName = (name: File | null) => {
//     setFileName(name);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="/homepage"
//           element={<HomePage onfileName={handleFileName} />}
//         />
//         <Route
//           path="/upload"
//           element={
//             <ParameterListPage
//               pFileName={pFileName}
//               apiResponseData={handleAPIData}
//             />
//           }
//         />
//         <Route
//           path="/report"
//           element={<ReportPage apiResponseData={reportAPIResponseData} />}
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import LoginPage from "../logInPage/LogInPage";
import HomePage from "../homePage/HomePage";
import ParameterListPage from "../parameterListPage/ParameterListPage";
import ReportPage from "../reportPage/ReportPage";



const AppRouter: React.FC = () => {
  const [pFileName, setFileName] = useState<File | null >(null);


  const handleFileName = (name : File | null) =>
    {
     
      setFileName(name);
      
    };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/homepage"
          element={<HomePage onfileName={handleFileName}/>} 
        />
        <Route
          path="/upload"
          element={<ParameterListPage pFileName = {pFileName}  />}
        />
        <Route path="/report" element={<ReportPage />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;