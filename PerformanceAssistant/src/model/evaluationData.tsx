
export interface CandidateDataModel {
  CandidateName: string;
  Data: { Parameter: string; Data: string }[];
}


export interface BatchDataModel {
    BatchData: {
        BatchName:string;
        CandidateDataModel: CandidateDataModel[];
    }
  }

export interface CandidateAnalysisModel {
    CandidateName: string;
    Stregths: {Parameter:string, Data:string};
    AreasOfImprovement: {Parameter:string, Data:string};
    InputForMentors: {Parameter:string, Data:string};
  }

export interface BatchAnalysisModel {
    BatchData: {
        BatchName:string;
        CandidateAnalysisModel: CandidateAnalysisModel[];
    }
  }
