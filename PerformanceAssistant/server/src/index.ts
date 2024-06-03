import express, { Request, Response } from 'express';
import {OpenAIService} from "./OpenAIService";
import { Authenticator } from './Authenticator/Authenticator';
import { UserCredentials } from './Interfaces/Interface';
import cors from "cors";
import { Database } from './Database/database';
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors<Request>());

app.post('/login', async (req: Request, res: Response) => {
  const authenticator = new Authenticator();
  const userCredentials: UserCredentials = req.body;
  
  let result = await authenticator.authenticate(userCredentials);
  console.log(result);
  res.send(result);
  
});


app.post('/evaluate', async (req: Request, res: Response) => {
  let oaiService = new OpenAIService();
  
  oaiService.evaluate(req.body).then((response)=>{
      res.send(response);
  }).catch((error)=>{
      res.send(error);
  });
});

app.post('/getselectedrecord',async(req:Request,res:Response) => {
    let obj = '665d70618f493d33be5ae23b';
    let db = new Database('mongodb://localhost:27017', 'PerformanceAssistance_DB');
    db.connectToDatabase();
    let a =  db.getReportById(obj); 
    console.log(a);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/getAllRecords", async (req: Request, res: Response) => {
  try {
    const database = new Database('mongodb://localhost:27017', 'PerformanceAssistance_DB');
    await database.connectToDatabase();
    const records = await database.getAllRecords("reports");
    res.send(records);
  } catch (error) {
    console.error('Failed to get records', error);
    res.status(500).send('Failed to get records');
  }
});