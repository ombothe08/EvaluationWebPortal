// src/useExcelParameters.ts
import { useState } from 'react';
import * as XLSX from 'xlsx';

interface UseExcelParametersReturn {
  parameters: string[];
  selectedParameters: string[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const useExcelParameters = (): UseExcelParametersReturn => {
  const [parameters, setParameters] = useState<string[]>([]);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonSheet = XLSX.utils.sheet_to_json<string[]>(worksheet, { header: 1 });
      const headers = jsonSheet[0]; // Assuming first row contains headers
      setParameters(headers);
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

  return {
    parameters,
    selectedParameters,
    handleFileUpload,
    handleCheckboxChange,
  };
};

export default useExcelParameters;
