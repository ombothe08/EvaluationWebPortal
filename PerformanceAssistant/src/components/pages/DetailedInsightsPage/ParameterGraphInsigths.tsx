import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { BatchInsightModel } from "../../../model/evaluationData";
import { useEffect, useState } from 'react';

const chartSetting = {
  yAxis: [
    {
      label: 'Candidates',
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value: number | null) => `${value}`;

const ParameterGraphInsights: React.FC<{ data: BatchInsightModel }> = ({ data }) => {
  const [formattedData, setFormattedData] = useState<any[]>([]);

  useEffect(() => {
    const insights = data.BatchData.insight.Data;
    const allParameters = Array.from(new Set(insights.flatMap(item => item.insight.map(i => i.parameter))));

    const transformedData = allParameters.map(parameter => {
      const candidatesData = insights.map(candidate => {
        const parameterData = candidate.insight.find(insight => insight.parameter === parameter);
        return {
          Name: candidate.Name,
          [parameter]: parameterData ? parameterData.strength : 0,
        };
      });
      return {
        parameter,
        candidatesData
      };
    });

    setFormattedData(transformedData);
  }, [data]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {formattedData.map(({ parameter, candidatesData }) => (
        <div key={parameter} style={{ width: '50%', marginBottom: '20px' }}>
          <h3>{parameter} Graph</h3>
          <BarChart
            dataset={candidatesData}
            xAxis={[{ scaleType: 'band', dataKey: 'Name' }]}
            series={[{ dataKey: parameter, label: `${parameter} strength`, valueFormatter }]}
            layout="vertical"
            grid={{ vertical: false }}
            {...chartSetting}
          />
        </div>
      ))}
    </div>
  );
};

export default ParameterGraphInsights;
