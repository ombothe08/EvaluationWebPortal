import express, { Request, Response } from 'express';
import {OpenAIService} from "./OpenAIService";
import { Authenticator } from './Authenticator/Authenticator';
import { BatchAnalysisModel, UserCredentials} from './Interfaces/Interface';
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
    const json = JSON.parse(response);
    const data = json as BatchAnalysisModel

      let db = new Database('mongodb://localhost:27017', 'PerformanceAssistance_DB');
      db.connectToDatabase();
      db.addReport(data);
      res.send(response);
  }).catch((error)=>{
      res.send(error);
  });
});

app.post('/evaluate/strengths', async (req: Request, res: Response) => {
  let oaiService = new OpenAIService();
  
  oaiService.evaluateStrength(req.body).then((response)=>{
    
      res.send(response);
  }).catch((error)=>{
      res.send(error);
  });
});



app.post('/getselectedrecord',async(req:Request,res:Response) => {

    const objid = req.body.Key;

    let db = new Database('mongodb://localhost:27017', 'PerformanceAssistance_DB');
    db.connectToDatabase();
    let dbreport =  await db.getReportById(objid); 
    let a = typeof(dbreport);
    res.send(dbreport);
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

app.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const database = new Database('mongodb://localhost:27017', 'PerformanceAssistance_DB');
    await database.connectToDatabase();
    const reportId = req.params.id; // Get the report ID from the request params
    const result = await database.deleteReportById(reportId);
    if (result.deletedCount === 1) {
      res.send(`Report with ID ${reportId} deleted successfully`);
    } else {
      res.status(404).send(`No report found with ID ${reportId}`);
    }
  } catch (error) {
    console.error('Failed to delete record', error);
    res.status(500).send('Failed to delete record');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
