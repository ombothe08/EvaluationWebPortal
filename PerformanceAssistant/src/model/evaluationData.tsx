
export interface CandidateDataModel {
  Name: string;
  Data: { Parameter: string; Data: string }[];
}

export interface BatchDataModel {

  Name: string;
  Date: string;
  Data: CandidateDataModel[];

}

export interface CandidateAnalysisModel {
  Name: string;
  Strengths: { Parameter: string, Data: string }[];
  AreasOfImprovement: { Parameter: string, Data: string }[];
  InputForMentors: { Parameter: string, Data: string }[];
}


// export interface BatchAnalysisModel {
//   BatchData: {
//     Name: string;
//     CandidateAnalysisModel: CandidateAnalysisModel[];
//   }
// }


export interface ServerData {
  objectid : string;
  BatchData: {
      BatchName:string;
      Module: string;
      Date:string;
      CandidateAnalysisModel: CandidateAnalysisModel[];
    Name: string;
    Module:string;
    CandidateAnalysisModel: CandidateAnalysisModel[];
  }
}
