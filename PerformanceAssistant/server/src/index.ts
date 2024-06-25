import express, { Request, Response, response } from "express";
import { OpenAIService } from "./openAIService/OpenAIService";
import { Authenticator } from "./authenticator/Authenticator";
import {
  BatchAnalysisModel,
  UserCredentials,
  StrengthAnalysisModel,
  CandidateAnalysisModel,
  BatchDbModel,
  InsightModel,
  CandidateDataModel,
  BatchDataModel,
} from "./interface/Interface";
import cors from "cors";
import { Database } from "./database/Database";
import { ObjectId } from "mongodb";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors<Request>());

app.post("/login", async (req: Request, res: Response) => {
  const authenticator = new Authenticator();
  const userCredentials: UserCredentials = req.body;
  let result = await authenticator.authenticate(userCredentials);
  res.send(result);
});

app.post("/evaluate", async (req: Request, res: Response) => {
  try {
    const request = req.body.transformedData;
    const parsedJson = JSON.parse(request);
    const cData: CandidateDataModel[] = parsedJson.Data;
    const batchata: BatchDataModel = parsedJson as BatchDataModel;

    // Initialize record with default values for all required properties

    let oaiService = new OpenAIService();
    let record: BatchAnalysisModel = await oaiService.startEvaluation(batchata);

    let db = new Database(
      "mongodb://localhost:27017",
      "PerformanceAssistance_DB"
    );
    await db.connectToDatabase();
    let objid = await db.addReport(record);
    let responseData = await db.getReportById(objid);

    res.send(responseData);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).send({ message: "Failed to evaluate data" });
  }
});

app.post("/getinsights", async (req: Request, res: Response) => {
  try {
    let objid = req.body.Key;
    let db = new Database(
      "mongodb://localhost:27017",
      "PerformanceAssistance_DB"
    );
    db.connectToDatabase();

    // Fetch insights by ID
    let insights = await db.getInsightsByID(objid);

    if (insights) {
      res.status(200).send(insights);
    } else {
      res.status(404).send({ message: "No insights found for the given ID" });
    }
  } catch (error) {
    console.error("Error fetching insights:", error);
    res.status(500).send({ message: "Failed to fetch insights" });
  }
});

app.post("/getSelectedRecord", async (req: Request, res: Response) => {
  let objid = req.body.Key;
  let db = new Database(
    "mongodb://localhost:27017",
    "PerformanceAssistance_DB"
  );
  db.connectToDatabase();
  let dbreport = await db.getReportById(objid);
  res.send(dbreport);
});

app.get("/getAllRecords", async (req: Request, res: Response) => {
  try {
    const database = new Database(
      "mongodb://localhost:27017",
      "PerformanceAssistance_DB"
    );
    await database.connectToDatabase();
    const records = await database.getAllRecords("reports");
    res.send(records);
  } catch (error) {
    console.error("Failed to get records", error);
    res.status(500).send("Failed to get records");
  }
});

app.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    const database = new Database(
      "mongodb://localhost:27017",
      "PerformanceAssistance_DB"
    );
    await database.connectToDatabase();
    const reportId = req.params.id;
    const result = await database.deleteReportById(reportId);
    if (result.deletedCount === 1) {
      res.send(`Report with ID ${reportId} deleted successfully`);
    } else {
      res.status(404).send(`No report found with ID ${reportId}`);
    }
  } catch (error) {
    console.error("Failed to delete record", error);
    res.status(500).send("Failed to delete record");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
