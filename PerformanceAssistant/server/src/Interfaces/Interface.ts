export interface UserCredentials {
    Email: string;
    Password: string;
  }

export interface CandidateAnalysisModel {
    CandidateName: string;
    Stregths: {Parameter:string, Data:string};
    AreasOfImprovement: {Parameter:string, Data:string};
    RecomendationForMentor: {Parameter:string, Data:string};
  }

export interface BatchAnalysisModel {
    BatchData: {
        BatchName:string;
        Module: string;
        CandidateAnalysisModel: CandidateAnalysisModel[];
    }
  }

  export interface CandidateDataModel {
    CandidateName: string;
    Data: {Parameter:string, Data:string};
  }

export interface BatchDataModel {
    BatchData: {
        BatchName:string;
        Module: string;
        CandidateDataModel: CandidateDataModel[];
    }
  }
  