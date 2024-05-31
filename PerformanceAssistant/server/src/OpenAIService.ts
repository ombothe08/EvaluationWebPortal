import OpenAI from 'openai';

export class OpenAIService {

   public async evaluate(): Promise<string | any> {

    const api_key = process.env.OAI_API_KEY;
        try {
            const openai = new OpenAI({apiKey: api_key});

            const completionResponse = await openai.chat.completions.create({
                messages: [{ role: "system", content: "How are you" }],
                model: "gpt-3.5-turbo",
              });
            return completionResponse.choices[0].message.content;

        } catch (error) {
            console.error('OpenAI Function exception:', error);
            return "";
        }
        return "";
   }  
}