
export interface CandidateDataModel {
    CandidateName: string;
    Module: string;
    Data: {Parameter:string, Data:string};
  }

interface BatchDataModel {
    BatchData: {
        BatchName:string;
        CandidateDataModel: CandidateDataModel[];
    }
  }

interface CandidateAnalysisModel {
    CandidateName: string;
    Module: string;
    Stregths: {Parameter:string, Data:string};
    AreasOfImprovement: {Parameter:string, Data:string};
    InputForMentors: {Parameter:string, Data:string};
  }

interface BatchAnalysisModel {
    BatchData: {
        BatchName:string;
        CandidateAnalysisModel: CandidateAnalysisModel[];
    }
  }
  