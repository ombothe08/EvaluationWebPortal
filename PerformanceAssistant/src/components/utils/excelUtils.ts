import * as XLSX from 'xlsx';

export const convertDataToExcel = (newData:any) => {
  var headers = [["Candidate Name", "Strengths", "Area of improvements", "Notes from Mentor"]];
  var ws= XLSX.utils.aoa_to_sheet([[]]);
  XLSX.utils.sheet_add_aoa(ws, headers, {origin: "A1"});

  const record =  newData.BatchData.AnalysisModel;
  
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
    let fileName:string = newData.BatchData.Name+" Report.xlsx";
    XLSX.writeFile(workbook, fileName);
  
}; 
