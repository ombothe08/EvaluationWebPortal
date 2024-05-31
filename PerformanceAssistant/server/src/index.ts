import express, { Request, Response } from 'express';
import {OpenAIService} from "./OpenAIService";
import { Authenticator } from './Authenticator/Authenticator';
import { UserCredentials } from './Interfaces/Interface';
import cors from "cors";

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

app.get('/evaluate', async (req: Request, res: Response) => {
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
