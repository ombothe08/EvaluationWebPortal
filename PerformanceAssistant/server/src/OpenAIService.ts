import OpenAI from 'openai';
import { BatchDataModel, CandidateAnalysisModel, CandidateDataModel, StrengthAnalysisModel } from './Interfaces/Interface';

export class OpenAIService {

  public async startEvaluation(cData: CandidateDataModel[]): Promise<CandidateAnalysisModel[] | any> {
    let cAnalysis: CandidateAnalysisModel[] = [];
  
    for (const candidate of cData) {
      try {
        // Wait for the evaluate function to resolve
        let answer =  this.evaluate(candidate);
        let json = JSON.parse(await answer);
        let cAnalysisData = json as CandidateAnalysisModel

        cAnalysis.push(cAnalysisData);
      } catch (error) {
        
        console.error(`Error evaluating candidate: ${candidate}`, error);
      }
    }
  
    return cAnalysis;
  }
  

   public async evaluate(batchData:CandidateDataModel): Promise<string | any> {
  
    

    const api_key = process.env.OAI_API_KEY;
        try {
            const openai = new OpenAI({apiKey: api_key});
            const prompt = `Here is data for analysis: \n${JSON.stringify(batchData)}
             Provide a detailed analysis and recommendation for mentors for the following candidate data 
             in strictly below JSON Format and dont add any characters:
                    {
                      "Name": "string",
                      "Strengths": [{
                        "Parameter": "string",
                        "Data": "string"
                      }],
                      "AreasOfImprovement": [
                        {
                          "Parameter": "string",
                          "Data": "string"
                        }
                      ],
                      "InputForMentors": [
                        {
                          "Parameter": "string",
                          "Data": "string"
                        }
                      ]     
                    }`;

            const completionResponse = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "Evaluate the candidate on the basis of data." },
                    { role: "user", content: prompt }
                ],
                model: "gpt-3.5-turbo",
              });
            return completionResponse.choices[0].message.content;

        } catch (error) {
            console.error('OpenAI Function exception:', error);
            return "";
        }
   }  
   public async insights(strengthData:CandidateAnalysisModel[]): Promise<string | any> {

    const api_key = process.env.OAI_API_KEY;
        try {
            const openai = new OpenAI({apiKey: api_key});
            const prompt = `Here is data for analysis: \n${JSON.stringify(strengthData, null, 2)}
             and compare the strengths of every candidate and provide their combine strength as well as individual strength scale from 0 to 100 in in strictly below JSON Format and dont add any characters:
             {
              "Data": [
                {
                  "Name": "string",
                  "CombineStrength": "number",
                  "suggestedRole": ["string"],
                  "insight": [
                    {
                      "parameter": "string",
                      "strength": "number"
                    }
                  ]
                }
              ]
            }
            `;

            const completionResponse = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a evaluator which evaluates and compares the strengths for each candidate on basis of different parameters individually and with combined parameters and also provide role for each candidate" },
                    { role: "user", content: prompt }
                ],
                model: "gpt-3.5-turbo",
              }); 
            return completionResponse.choices[0].message.content;

        } catch (error) {
            console.error('OpenAI Function exception:', error);
            return "";
        }
   } 
}