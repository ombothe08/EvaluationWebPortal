// src/useExcelParameters.ts
import { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import {BatchDataModel, CandidateDataModel} from '../../../model/evaluationData'

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
  const [fileName, setFileName] = useState<string>('');

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

    const candidateDataModel: CandidateDataModel[] = rows.map(row => ({
      CandidateName: row[0] as string,
      Data: headers.slice(1).map((header, index) => ({
        Parameter: header,
        Data: row[index + 1] as string,
      })),
    }));

    const batchDataModel: BatchDataModel = {
      BatchData: {
        BatchName: batchName,
        CandidateDataModel: candidateDataModel,
      }
    };

    return batchDataModel;
  };

  const submitData = async () => {
    try {
      const batchDataModel: BatchDataModel = transformData(jsonSheet, fileName);
      console.log(batchDataModel);
      const response = await axios.post('/api/other-api', {
        selectedParameters,
        transformedData: batchDataModel,
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
