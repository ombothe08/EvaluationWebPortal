import OpenAI from 'openai';
import { BatchAnalysisModel, BatchDataModel, CandidateAnalysisModel, CandidateDataModel, InsightModel, StrengthAnalysisModel } from './interface/Interface';

export class OpenAIService {

  public async startEvaluation(Data: BatchDataModel): Promise<BatchAnalysisModel> {
    let cAnalysis: CandidateAnalysisModel[] = [];
    let cInsight = '[';
    let result: BatchAnalysisModel = {
      BatchData: {
        Name: Data.Name,
        Module: Data.Module,
        AnalysisModel: [],
        insight: {} as InsightModel
      }
    };

    let cData = Data.Data;
    for (const candidate of cData) {
      try {
        // Wait for the evaluate function to resolve
        let answer = this.evaluate(candidate);
        let candidateAnalysis = await answer;
        let cAnalysisData = candidateAnalysis as CandidateAnalysisModel;
        let cInsightsData = await this.insights(cAnalysisData);

        cInsight += JSON.stringify(cInsightsData); // Concatenate cInsightsData JSON string to cInsight
        cInsight += ',';
        cAnalysis.push(cAnalysisData);
      } catch (error) {
        console.error(`Error evaluating candidate: ${candidate}`, error);
      }
    }
    
    cInsight = cInsight.slice(0, -1); // Remove trailing comma
    cInsight += ']'; // Close the JSON array
   
    let cInsightData : InsightModel = this.convertToInsightModel(cInsight);
    result.BatchData.AnalysisModel = cAnalysis; //
    result.BatchData.insight = cInsightData; // Parse concatenated insights as JSON array

    return result;
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
            console.log(responseContent);
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
      and give me the strengths of candidate and provide their combined strength as well as individual strength scale from 0 to 100 in just the below JSON format only:
      \`\`\`json
      {
        "Name" : "string",
        "CombineStrength":"number",
        "suggestedRole":["string"],
        "insight":[
        {
            "parameter": "string";
            "strength": "number";
        },
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

public convertToInsightModel(insightString: string): InsightModel {
  try {
    // Remove extra escape characters
    const cleanedInsightString = insightString.replace(/\\\"/g, '"').replace(/\"/g, '"');
   
    // Parse the cleaned string into a JSON object
    const parsedInsight = JSON.parse(cleanedInsightString);
    
    // Ensure the parsed object matches the InsightModel structure
    const insightModel: InsightModel = {
      Data: parsedInsight
    };
    
    return insightModel;
  } catch (error) {
    console.error('Error converting insight string to InsightModel:', error);
    throw new Error('Conversion to InsightModel failed');
  }
}
}

