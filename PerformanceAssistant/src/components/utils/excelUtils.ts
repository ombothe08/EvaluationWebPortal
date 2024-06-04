import * as XLSX from 'xlsx';
import { CandidateAnalysisModel, ServerData } from '../../model/evaluationData';

// Define an interface for the analyzedData object
interface AnalyzedData {
  CandidateName: string;
  Strengths: { Parameter: string; Data: string }[];
  AreasOfImprovement: { Parameter: string; Data: string }[];
  InputForMentore: { Parameter: string; Data: string }[];
}

// Define an interface for the report object
interface Report {
  name: string;
  module: string;
  Date: string;
  analyzedData: AnalyzedData[];
}

// Define an interface for the entire data structure
interface Data {
  _id: { $oid: string };
  report: Report;
}

// Assuming you have the data as a variable called 'myData' of type 'Data'
const myData: Data = {
  "_id": {
    "$oid": "665d73f74948933eb9e9225d"
  },
  "report": {
    "name": "Quarterly Performance Analysis",
    "module": "Sales",
    "Date": "2023-04-01",
    "analyzedData": [
      {
        "CandidateName": "John Doe",
        "Strengths": [
          {
            "Parameter": "Communication",
            "Data": "Excellent"
          },
          {
            "Parameter": "Sales Skills",
            "Data": "Very Good"
          }
        ],
        "AreasOfImprovement": [
          {
            "Parameter": "Time Management",
            "Data": "Needs Improvement"
          }
        ],
        "InputForMentore": [
          {
            "Parameter": "Focus on advanced sales techniques",
            "Data": "Recommend attending advanced sales training sessions."
          }
        ]
      },
      {
        "CandidateName": "Jane Smith",
        "Strengths": [
          {
            "Parameter": "Customer Service",
            "Data": "Outstanding"
          },
          {
            "Parameter": "Product Knowledge",
            "Data": "Excellent"
          }
        ],
        "AreasOfImprovement": [
          {
            "Parameter": "Punctuality",
            "Data": "Needs Improvement"
          }
        ],
        "InputForMentore": [
          {
            "Parameter": "Time Management Workshops",
            "Data": "Encourage participation in time management workshops."
          }
        ]
      }
    ]
  }
}


export const convertDataToExcel = (newData:any) => {
  var headers = [["Candidate Name", "Strengths", "Area of improvements", "Notes from Mentor"]];
  var ws= XLSX.utils.aoa_to_sheet([[]]);
  XLSX.utils.sheet_add_aoa(ws, headers, {origin: "A1"});

  const record =  newData.BatchData.AnalysisModel;//newData.BatchData.AnalysisModel;//myData.report.analyzedData;
  //const l1: number = record.length;
  for(var i:number= 0;i<record.length;i++) {
    let oneCandidate:string[] = [];
    oneCandidate.push(record[i].Name);// .CandidateName);

    let strengthCell:string =record[i].Strengths[0].Parameter +":"+  record[i].Strengths[0].Data+";\n";
    strengthCell += record[i].Strengths[1].Parameter + ":"+ record[i].Strengths[1].Data;
    oneCandidate.push(strengthCell);

    let improvCell:string = record[i].AreasOfImprovement[0].Parameter + ":"+record[i].AreasOfImprovement[0].Data;
    oneCandidate.push(improvCell);

    let notesCell:string = record[i].InputForMentors[0].Parameter+":"+ record[i].InputForMentors[0].Data;
    oneCandidate.push(notesCell);

    let rowNum:number = i+2;
    XLSX.utils.sheet_add_aoa(ws, [oneCandidate], {origin: "A"+rowNum});
  }
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, "Report Details");
    let fileName:string = newData.BatchData.Module+" Report.xlsx";
    XLSX.writeFile(workbook, fileName);
  
}; 
