import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

import { dbuser,UserCredentials,BatchDbModel,BatchAnalysisModel } from '../Interfaces/Interface';







export class Database {
  private uri: string;
  private dbName: string;
  private client: MongoClient;
  private db: Db | undefined;

  constructor(uri: string, dbName: string) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri);
  }

  public connectToDatabase(): void {
    this.client.connect();
    this.db = this.client.db(this.dbName);
    console.log('Connected to database');
  }

  public async verifyUserCredentials(userCredentials: UserCredentials): Promise<boolean | any> {
    if (!this.db) {
      
      throw new Error('Database connection is not established');
    }

    const usersCollection: Collection = this.db.collection('users');
    console.log(usersCollection);

    let collection = await usersCollection.find({}).toArray();
    if (collection.length > 0 && Array.isArray(collection[0].users)) 
    { 
      
      const users: dbuser[] = collection[0].users;

      // Extract and log each user's data
      for (const userData of users) {
        const db_username = userData.email;
        const db_password = userData.password;
        if (db_username === userCredentials.Email && db_password === userCredentials.Password) {
          return true;
        }
        
      }
    return false;
      
    } else {
      console.log('No users found in the collection');
    }
  
  }

  public async addReport(batchAnalysis: BatchAnalysisModel): Promise<void> {
    if (!this.db) {
      throw new Error('Database connection is not established');
    }

    const collection: Collection = this.db.collection('reports');
    console.log(collection);
    try {
      await collection.insertOne(batchAnalysis);
      console.log('Report added successfully');
    } catch (error) {
      console.error('Failed to add report', error);
    }
  }

  
  public async getReportById(reportId: string): Promise<BatchDbModel | null> {
    if (!this.db) {
      throw new Error('Database connection is not established');
    }

    const collection: Collection = this.db.collection('reports');
    try {
      const objectId = new ObjectId(reportId); // Convert string to ObjectId
      const report = await collection.findOne({ _id: objectId }); // Find document by ObjectId
      if (report) {
        console.log('Report found:', report);
        // Transform the retrieved document to BatchDbModel
        const batchDbModel: BatchDbModel = {
          objectid: report._id.toString(),
          BatchData: {
            BatchName: report.report.name,
            Module: report.report.module,
            Date: report.report.Date,
            CandidateAnalysisModel: report.report.analyzedData.map((data: any) => ({
              Name: data.CandidateName,
              Strengths: data.Strengths.map((strength: any) => ({
                Parameter: strength.Parameter,
                Data: strength.Data
              })),
              AreasOfImprovement: data.AreasOfImprovement.map((improvement: any) => ({
                Parameter: improvement.Parameter,
                Data: improvement.Data
              })),
              RecomendationForMentor: data.InputForMentore.map((input: any) => ({
                Parameter: input.Parameter,
                Data: input.Data
              }))
            }))
          }
        };
        return batchDbModel;
      } else {
        console.log('No report found with the given ID');
        return null;
      }
    } catch (error) {
      console.error('Failed to get report', error);
      throw error;
    }
  }
}

  



