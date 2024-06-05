
// input for openai
export interface CandidateDataModel {
  Name: string;
  Data: { Parameter: string; Data: string }[];
}

export interface BatchDataModel {
  Name: string;
  Module: string;
  Data: CandidateDataModel[];
}

// output from openai
export interface BatchAnalysisModel {
  BatchData: {
    Name: string;
    Module: string;
    Date: string;
    AnalysisModel: CandidateAnalysisModel[];
    CandidateStrengthAnalysis: CandidateStrengthAnalysis;
  };
}

export interface CandidateAnalysisModel {
  Name: string;
  Strengths: { Parameter: string; Data: string }[];
  AreasOfImprovement: { Parameter: string; Data: string }[];
  InputForMentors: { Parameter: string; Data: string }[];
}

// output from server
export interface ServerData {
  objectid: string | null;
  BatchData: {
    Name: string;
    Module: string;
    Date: string;
    AnalysisModel: CandidateAnalysisModel[];
    CandidateStrengthAnalysis: CandidateStrengthAnalysis;

  };
}
//Store strengths 
export interface StrengthAnalysisModel {
  Name: string;
  Strengths: { Parameter: string, Data: string }[];
}

export interface CandidateStrengthAnalysis{
  Data : { Name : string , Strength : number}[]
 }