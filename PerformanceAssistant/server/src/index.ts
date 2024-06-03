import express, { Request, Response } from 'express';
import {OpenAIService} from "./OpenAIService";
import { Authenticator } from './Authenticator/Authenticator';
import { UserCredentials } from './Interfaces/Interface';
import cors from "cors";
import { Database } from './Database/database';
import { v4 as uuidv4 } from 'uuid';

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/getAllRecords",async ()=>{
  let database = new Database('mongodb://localhost:27017', 'PerformanceAssistance_DB');
  database.connectToDatabase();
  let xx=await database.getAllRecords("reports");
  console.log(xx);
  
});
