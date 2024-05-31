import React from 'react';
import useExcelParameters from './UseExcelParametersReturn';
 
const UploadAndExtract: React.FC = () => {
  const {
    parameters,
    selectedParameters,
    handleCheckboxChange,
    submitData,
  } = useExcelParameters();
 
  return (
    <div>
      {parameters.length > 0 && (
        <div>
          <h3>Select Parameters:</h3>
          {parameters.map((param, index) => (
            <div key={index}>
              <input
                type="checkbox"
                name={param}
                onChange={handleCheckboxChange}
              />
              <label>{param}</label>
            </div>
          ))}
        </div>
      )}
      {selectedParameters.length > 0 && (
        <div>
          <h3>Selected Parameters:</h3>
          <ul>
            {selectedParameters.map((param, index) => (
              <li key={index}>{param}</li>
            ))}
          </ul>
          <button onClick={submitData}>Submit Data</button>
        </div>
      )}
    </div>
  );
};
 
export default UploadAndExtract;
