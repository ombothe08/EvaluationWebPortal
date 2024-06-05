export interface CandidateDataModel {
  Name: string;
  Data: { Parameter: string; Data: string }[];
}

export interface BatchDataModel {
  Name: string;
  Data: CandidateDataModel[];
}

export interface BatchAnalysisModel {
  BatchData: {
    Name: string;
    Module: string;
    Date: string;
    AnalysisModel: CandidateAnalysisModel[];
  };
}

export interface CandidateAnalysisModel {
  Name: string;
  Strengths: { Parameter: string; Data: string }[];
  AreasOfImprovement: { Parameter: string; Data: string }[];
  InputForMentors: { Parameter: string; Data: string }[];
}

export interface ServerData {
  objectid: string | null;
  BatchData: {
    Name: string;
    Module: string;
    Date: string;
    AnalysisModel: CandidateAnalysisModel[];
  };
}
