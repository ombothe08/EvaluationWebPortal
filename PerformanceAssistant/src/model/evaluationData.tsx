
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
  Stregths: { Parameter: string, Data: string };
  AreasOfImprovement: { Parameter: string, Data: string };
  InputForMentors: { Parameter: string, Data: string };
}


// export interface BatchAnalysisModel {
//   BatchData: {
//     Name: string;
//     CandidateAnalysisModel: CandidateAnalysisModel[];
//   }
// }


// export interface ServerData {
//   objectid: string;
//   BatchData: {
//     Date: string;
//     // other fields...
//   };
// }

export interface ServerData {
  objectid : string;
  BatchData: {
      BatchName:string;
      Module: string;
      Date:string;
      CandidateAnalysisModel: CandidateAnalysisModel[];
  }
}
