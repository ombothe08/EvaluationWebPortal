import OpenAI from 'openai';
import { BatchDataModel } from './Interfaces/Interface';

export class OpenAIService {

   public async evaluate(batchData:BatchDataModel): Promise<string | any> {

    const api_key = process.env.OAI_API_KEY;
        try {
            const openai = new OpenAI({apiKey: api_key});
            const prompt = `Here is data for analysis: \n${JSON.stringify(batchData, null, 2)}
             Provide a detailed analysis and recommendation for mentors for the following batch data in the JSON format as specified:
             {
                "BatchData": {
                  "Name": "string",
                  "Module": "string",
                  "AnalysisModel": [
                    {
                      "Name": "string",
                      "Strengths": {
                        "Parameter": "string",
                        "Data": "string"
                      },
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
                  ]
                }
              }`;

            const completionResponse = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: "We gave software development training to a fresher and now evaluating each by giving individual projects." },
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