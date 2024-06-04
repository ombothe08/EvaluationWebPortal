//Login credentials
export interface UserCredentials {
    Email: string;
    Password: string;
  }

//Db user Credentials
  export interface dbuser {
    email: string;
    password: string;
  }

//Database model
export interface BatchDbModel {
  objectid : string | null;
  BatchData: {
      Name:string;
      Module: string;
      Date:string;
      AnalysisModel: CandidateAnalysisModel[];

  }
}

//Analysis Mode is the output from OpenAI
export interface CandidateAnalysisModel {
  Name: string;
  Strengths: { Parameter: string, Data: string }[];
  AreasOfImprovement: { Parameter: string, Data: string }[];
  InputForMentors: { Parameter: string, Data: string }[];
}
 
 
export interface BatchAnalysisModel {
  BatchData: {
    Name: string;
    Module: string;
    AnalysisModel: CandidateAnalysisModel[];
  }
}


// DataModel is the input for analysis 
export interface CandidateDataModel {
  Name: string;
  Data: { Parameter: string; Data: string }[];
}
 
export interface BatchDataModel {
  Name: string;
  Module: string;
  Data: CandidateDataModel[];
}

export interface StrengthAnalysisModel {
  Name: string;
  Strengths: { Parameter: string, Data: string }[];
}


