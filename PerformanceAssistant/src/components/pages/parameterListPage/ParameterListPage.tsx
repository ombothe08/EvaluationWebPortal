import { Grid, Checkbox, FormControlLabel, Button, Paper } from '@mui/material';
// import {UseExcelParametersReturn} from '../uploadFilePage/UseExcelParametersReturn';
import * as XLSX from 'xlsx';
import { BatchAnalysisModel, BatchDataModel, CandidateDataModel } from '../../../model/evaluationData'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ParameterListPage: React.FC<{ pFileName: File | null ;}> = ({pFileName : afileName}) => {
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [jsonSheet, setJsonSheet] = useState<any[][]>([]); // Array of arrays representing the JSON sheet data
  const [fileName, setFileName] = useState<File | null >(null);
  // const [apiResponseData, setAPIResponseData] = useState<BatchAnalysisModel|null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Replace with your program flow condition to activate handleFileUpload
    setFileName(afileName);
    console.log(" The file is = " + afileName);    
    handleFileUpload(afileName); 
  }, []);
 
  const handleFileUpload = (file: File | null) => {
if(!file) return;
    const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
  
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonSheet = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });
      const headers = jsonSheet[0]; // Assuming first row contains headers
      setParameters(headers.slice(1)); // Exclude the first column (CandidateName)
      setJsonSheet(jsonSheet);
      console.log(jsonSheet);
    };

    reader.readAsArrayBuffer(file);
  };


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedParameters([...selectedParameters, name]);
    } else {
      setSelectedParameters(selectedParameters.filter(param => param !== name));
    }
  };

  const transformData = (jsonSheet: any[][], batchName: string): BatchDataModel => {
    const headers = jsonSheet[0];
    const rows = jsonSheet.slice(1);
    const candidateDataModel: CandidateDataModel[] = rows.map(row => ({
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
      if(!fileName) return;
      const batchDataModel: BatchDataModel = transformData(jsonSheet, fileName.name);
      const batchDataModelString = JSON.stringify(batchDataModel);
      console.log(batchDataModelString);
      console.log(batchDataModel);
  
      const response = await fetch('http://localhost:3000/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedParameters,
          transformedData: batchDataModelString,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
      navigate('/report', { state: { apiResponseData: responseData } });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to right, #4299E1, #48BB78, #9F7AEA)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 'calc(100% - 20px)', padding: '20px', margin: 'auto' }}>
        {parameters.length > 0 && (
          <Paper style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: '400px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px', textAlign: 'center' }}>Select Parameters:</h3>
            <Grid container spacing={4}>
              {parameters.map((param, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Paper elevation={2} style={{ padding: '16px', borderRadius: '8px', background: selectedParameters.includes(param) ? '#48BB78' : '#4299E1' }}>
                    <FormControlLabel
                      control={<Checkbox color="primary" onChange={handleCheckboxChange} name={param} style={{ color: selectedParameters.includes(param) ? '#000000' : ' #000000' }} />}
                      label={<span style={{ fontSize: '18px' }}>{param}</span>}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}
        {selectedParameters.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={submitData}
              style={{ fontSize: '18px' }}
            >
              Generate Report
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default ParameterListPage;