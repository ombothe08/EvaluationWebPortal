import express, { Request, Response } from 'express';
import {OpenAIService} from "./OpenAIService";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/evaluvate', async (req: Request, res: Response) => {
    let oaiService = new OpenAIService();
    oaiService.evaluate().then((response)=>{
        res.send(response);
    }).catch((error)=>{
        res.send(error);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
