import OpenAI from 'openai';
import { BatchAnalysisModel, BatchDataModel, CandidateAnalysisModel, CandidateDataModel, InsightModel, StrengthAnalysisModel } from './Interfaces/Interface';

export class OpenAIService {

  public async startEvaluation(Data: BatchDataModel): Promise<CandidateAnalysisModel[]> {
    let cAnalysis: CandidateAnalysisModel[] = [];
    let cInsight : InsightModel ;
    
    let cData =  Data.Data ;
    for (const candidate of cData) {
      try {
        // Wait for the evaluate function to resolve
        let answer =  this.evaluate(candidate);
        let candidateAnalysis = await answer
        let cAnalysisData = candidateAnalysis as CandidateAnalysisModel
        let cInsightsData = this.insights(cAnalysisData);

        cInsight.Data.push(cInsightsData);
        cAnalysis.push(cAnalysisData);
      } catch (error) { 
        console.error(`Error evaluating candidate: ${candidate}`, error);
      }
    }
    return cAnalysis;
  }
  

  public async evaluate(batchData: CandidateDataModel): Promise<string | any> {
    const api_key = process.env.OAI_API_KEY;
    try {
        const openai = new OpenAI({ apiKey: api_key });
        const prompt = `Here is data for analysis: \n${JSON.stringify(batchData)}
        Provide a detailed analysis and recommendation for mentors for the following candidate data 
        in strictly below JSON Format and don't add any characters:
        \`\`\`json
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
        }
        \`\`\``;

        const completionResponse = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Evaluate the candidate on the basis of data." },
                { role: "user", content: prompt }
            ],
            model: "gpt-3.5-turbo",
        });

        const responseContent = completionResponse.choices[0].message.content;
       
        // Extract JSON from the response using regex
        const jsonMatch = responseContent!!.match(/```json([\s\S]*?)```/);
        if (jsonMatch && jsonMatch[1]) {
            const jsonString = jsonMatch[1].trim();
            return JSON.parse(jsonString);
        } else {
            throw new Error('JSON not found in response');
        }

    } catch (error) {
        console.error('Error evaluating candidate:', error);
        return "";
    }
}
public async insights(strengthData: CandidateAnalysisModel): Promise<string | any> {
  const api_key = process.env.OAI_API_KEY;
  try {
      const openai = new OpenAI({ apiKey: api_key });
      const prompt = `Here is data for analysis: \n${JSON.stringify(strengthData, null, 2)}
      and compare the strengths of every candidate and provide their combined strength as well as individual strength scale from 0 to 100 in just the below JSON format only:
      \`\`\`json
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
      \`\`\``;

      const completionResponse = await openai.chat.completions.create({
          messages: [
              { role: "system", content: "You are an evaluator which evaluates and compares the strengths for each candidate on the basis of different parameters individually and with combined parameters and also provide role for each candidate" },
              { role: "user", content: prompt }
          ],
          model: "gpt-3.5-turbo",
      });

      const responseContent = completionResponse.choices[0].message.content;
      console.log("Response Content: ", responseContent);

      // Extract JSON from the response using regex
      const jsonMatch = responseContent!!.match(/```json([\s\S]*?)```/);
      if (jsonMatch && jsonMatch[1]) {
          const jsonString = jsonMatch[1].trim();
          return JSON.parse(jsonString);
      } else {
          throw new Error('JSON not found in response');
      }
  } catch (error) {
      console.error('OpenAI Function exception:', error);
      return "";
  }
}
}