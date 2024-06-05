import { Grid, Checkbox, FormControlLabel, Button, Paper } from "@mui/material";
import * as XLSX from "xlsx";
import {
  BatchAnalysisModel,
  BatchDataModel,
  CandidateDataModel,
  ServerData,
} from "../../../model/evaluationData";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const ParameterListPage: React.FC<{ parameterFileName: File | null }> = ({
  parameterFileName: uploadfileName,
}) => {
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [jsonSheet, setJsonSheet] = useState<any[][]>([]);
  const [fileName, setFileName] = useState<File | null>(null);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    setFileName(uploadfileName);
    handleFileUpload(uploadfileName);
  }, []);

  const handleFileUpload = (file: File | null) => {
    if (!file) return;
    const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonSheet = XLSX.utils.sheet_to_json<any[]>(worksheet, {
        header: 1,
      });
      const headers = jsonSheet[0];
      setParameters(headers.slice(1));
      setJsonSheet(jsonSheet);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedParameters([...selectedParameters, name]);
    } else {
      setSelectedParameters(
        selectedParameters.filter((param) => param !== name)
      );
    }
  };

  const transformData = (
    jsonSheet: any[][],
    batchName: string
  ): BatchDataModel => {
    const headers = jsonSheet[0];
    const rows = jsonSheet.slice(1);
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = month + "/" + date + "/" + year;
    const candidateDataModel: CandidateDataModel[] = rows.map((row) => ({
      Name: row[0] as string,
      Data: headers.slice(1).map((header, index) => ({
        Parameter: header,
        Data: row[index + 1] as string,
      })),
    }));

    const batchDataModel: BatchDataModel = {
      Name: batchName,
      Data: candidateDataModel,
    };

    return batchDataModel;
  };

  const submitData = async () => {
    try {
      if (!fileName) return;
      const batchDataModel: BatchDataModel = transformData(
        jsonSheet,
        fileName.name
      );
      const batchDataModelString = JSON.stringify(batchDataModel);
      console.log(batchDataModel);

      const response = await fetch("http://localhost:3000/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedParameters,
          transformedData: batchDataModelString,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      console.log(responseData);
      navigate("/report", { state: { apiResponseData: responseData } });
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const goBack = () => {
    window.history.back(); // Go back to previous page
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <Navbar></Navbar>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "calc(100% - 20px)",
          padding: "20px",
          margin: "auto",
        }}
      >
        <div
          style={{
            fontSize: "50px",
            fontWeight: "600",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          Select Parameters
        </div>
        {parameters.length > 0 && (
          <Paper
            style={{
              background: "aliceblue",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              height: "400px",
              overflowY: "auto",
            }}
          >
            <Grid container spacing={4}>
              {parameters.map((param, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Paper
                    elevation={2}
                    style={{
                      padding: "16px",
                      borderRadius: "8px",
                      background: selectedParameters.includes(param)
                        ? "#48BB78"
                        : "#4299E1",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                        disabled={showLoader}
                          color="primary"
                          onChange={handleCheckboxChange}
                          name={param}
                          style={{
                            color: selectedParameters.includes(param)
                              ? "#000000"
                              : " #000000",
                          }}
                        />
                      }
                      label={<span style={{ fontSize: "25px" }}>{param}</span>}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
        {selectedParameters.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "24px",
            }}
          >
            <Button
              onClick={goBack}
              variant="contained"
              color="primary"
              style={{ fontSize: "18px", marginRight: "8px" }}
            >
              Back
            </Button>
            <Button
            disabled={showLoader}
              variant="contained"
              color="primary"
              onClick={()=>{
                setShowLoader(true);
                submitData();
              }}
              style={{ fontSize: "18px" }}
            >
              Evaluate
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParameterListPage;