import { useState } from 'react';
import * as XLSX from 'xlsx';
import { BatchDataModel, CandidateDataModel } from '../../../model/evaluationData';

export interface UseExcelParametersReturn {
  parameters: string[];
  selectedParameters: string[];
  apiData: string[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitData: () => Promise<boolean>;
}

const useExcelParameters = (): UseExcelParametersReturn => {
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [jsonSheet, setJsonSheet] = useState<any[][]>([]); // Array of arrays representing the JSON sheet data
  const [fileName, setFileName] = useState<string>('');
  const [apiData, setResponseData] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const nameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");
    setFileName(nameWithoutExtension);

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
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = month + "/" + date + "/" + year;
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

  const submitData = async (): Promise<boolean> => {
    try {
      const batchDataModel: BatchDataModel = transformData(jsonSheet, fileName);
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
      setResponseData(responseData); // Set the response data in state
      console.log("responsedata",apiData );
      responseData.BatchData.AnalysisModel.forEach((candidate: { Name: any; Strengths: any; AreasOfImprovement: any; InputForMentors: any; }, index: number) => {
        console.log(`Candidate ${index + 1}: ${candidate.Name}`);
        console.log("Strengths:", candidate.Strengths);
        console.log("Areas of Improvement:", candidate.AreasOfImprovement);
        console.log("Input for Mentors:", candidate.InputForMentors);
      });

      return true; 
    } catch (error) {
      console.error('Error submitting data:', error);
      return false;
    }
  };
  return {
    parameters,
    selectedParameters,
    apiData,
    handleFileUpload,
    handleCheckboxChange,
    submitData,
  };
};

export default useExcelParameters;