import React from 'react';
import { UseExcelParametersReturn } from './UseExcelParametersReturn';

interface UploadAndExtractProps {
  useExcelParameters: UseExcelParametersReturn; // Pass UseExcelParametersReturn as a prop
}

const UploadAndExtract: React.FC<UploadAndExtractProps> = ({ useExcelParameters }) => {
  return (
    <div>
      {useExcelParameters.parameters.length > 0 && (
        <div>
          <h3>Select Parameters:</h3>
          {useExcelParameters.parameters.map((param, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={param}
                onChange={useExcelParameters.handleCheckboxChange}
              />
              <label>{param}</label>
            </div>
          ))}
        </div>
      )}
      {useExcelParameters.selectedParameters.length > 0 && (
        <div>
          <h3>Selected Parameters:</h3>
          <ul>
            {useExcelParameters.selectedParameters.map((param, index) => (
              <li key={index}>{param}</li>
            ))}
          </ul>
          <button onClick={useExcelParameters.submitData}>Submit Data</button>
        </div>
      )}
    </div>
  );
};
 
export default UploadAndExtract;
