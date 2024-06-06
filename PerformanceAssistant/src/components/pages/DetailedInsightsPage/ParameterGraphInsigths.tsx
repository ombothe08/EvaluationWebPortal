import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { ServerData } from "../../../model/evaluationData";
import { useLocation } from "react-router-dom"; // Import useLocation
import { useEffect, useState } from 'react';

const chartSetting = {
  xAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 500,
  height: 400,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Fev',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 60,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 59,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 61,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
];

const valueFormatter = (value: number | null) => `${value}mm`;

const ParameterGraphInsights: React.FC = () => {
    //const location = useLocation();
    //const { data } = location.state as { data: ServerData };
    
    const [graphData, setGraphData] = useState<ServerData[]>([]);
    const objectid:string = "66606f3fd0f976236fdd70d5";
    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/getSelectedRecord", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ Key: objectid }),
            });
      
            let data: ServerData;
            data = await response.json();
            setGraphData([data]);
           }   catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);

    

  return (
    <div>
    <div>
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }]}
      layout="horizontal"
      grid={{ vertical: true }}
      {...chartSetting}
    />
    <BarChart 
    dataset={dataset}
    yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
    series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }]}
    layout="horizontal"
    grid={{ vertical: true }}
    {...chartSetting}
    />
    </div>




<div>
          {graphData[0].BatchData.AnalysisModel[0]
          parameters.length > 0 
          &&
           (
            <Paper
              style={{
                width: "calc(100vw - 40px)",
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
                          
                          <BarChart
                            dataset={dataset}
                            yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                            series={[{ dataKey: 'seoul', label: 'Seoul rainfall', valueFormatter }]}
                            layout="horizontal"
                            grid={{ vertical: true }}
                            {...chartSetting}
                            />
                        }
                        label={<span style={{ fontSize: "20px", color: "#FFFFFF" }}>{param}</span>}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          )}
        </div>

        </div>
  );
}
export default ParameterGraphInsights;