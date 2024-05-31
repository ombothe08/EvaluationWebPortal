// src/useExcelParameters.ts
import { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

interface CandidateDataModel {
  CandidateName: string;
  Module: string;
  Data: { Parameter: string; Data: string }[];
}

interface UseExcelParametersReturn {
  parameters: string[];
  selectedParameters: string[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitData: () => Promise<void>;
}

const useExcelParameters = (): UseExcelParametersReturn => {
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [jsonSheet, setJsonSheet] = useState<any[][]>([]); // Array of arrays representing the JSON sheet data

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonSheet = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });
      const headers = jsonSheet[0]; // Assuming first row contains headers
      setParameters(headers);
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

  const transformData = (jsonSheet: any[][]): CandidateDataModel[] => {
    const headers = jsonSheet[0];
    const rows = jsonSheet.slice(1);

    return rows.map(row => ({
      CandidateName: row[0],
      Module: row[1],
      Data: headers.slice(2).map((header, index) => ({
        Parameter: header,
        Data: row[index + 2],
      })),
    }));
  };

  const submitData = async () => {
    try {
      const transformedData = transformData(jsonSheet);
      const response = await axios.post('/api/other-api', {
        selectedParameters,
        transformedData,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return {
    parameters,
    selectedParameters,
    handleFileUpload,
    handleCheckboxChange,
    submitData,
  };
};

export default useExcelParameters;
