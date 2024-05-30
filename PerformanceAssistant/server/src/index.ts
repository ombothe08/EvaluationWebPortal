import express, { Request, Response } from 'express';
import OpenAI from 'openai';

const app = express();
const port = process.env.PORT || 3000;
const api_key = process.env.OAI_API_KEY;
app.use(express.json());
const openai = new OpenAI({
    apiKey: api_key,
  });

app.get('/evaluvate', async (req: Request, res: Response) => {

    try {
        const completionResponse = await openai.chat.completions.create({
            messages: [{ role: "system", content: "How are you" }],
            model: "gpt-3.5-turbo",
          });


        const completion = completionResponse.choices[0].message.content;
        res.json({ completion });
    } catch (error) {
        console.error('Error fetching completion from OpenAI API:', error);
        res.status(500).json({ error: 'An error occurred while fetching the completion.' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
