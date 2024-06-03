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
  objectid : string;
  BatchData: {
      BatchName:string;
      Module: string;
      Date:string;
      CandidateAnalysisModel: CandidateAnalysisModel[];
  }
}



//Analysis Mode is the output from OpenAI
export interface CandidateAnalysisModel {
  Name: string;
  Strengths: { Parameter: string; Data: string }[];
  AreasOfImprovement: { Parameter: string; Data: string }[];
  RecomendationForMentor: { Parameter: string; Data: string }[];
}

export interface BatchAnalysisModel {
  BatchData: {
      Name:string;
      Module: string;
      CandidateAnalysisModel: CandidateAnalysisModel[];
  }
}


// DataModel is the input for analysis 
  export interface CandidateDataModel {
    Name: string;
    Data: {Parameter:string, Data:string};
  }

export interface BatchDataModel {
    BatchData: {
        Name:string;
        Module: string;
        CandidateDataModel: CandidateDataModel[];
    }
  }
  