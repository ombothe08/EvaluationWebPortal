import { MongoClient, Db, Collection } from 'mongodb';
import { UserCredentials } from '../Interfaces/Interface';
//import {v4 as uuidv4} from 'uuid';

interface User {
  email: string;
  password: string;
}

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
      
      const users: User[] = collection[0].users;

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

  public async addReport(report: any): Promise<void> {
    if (!this.db) {
      throw new Error('Database connection is not established');
    }

    const collection: Collection = this.db.collection('reports');
    console.log(collection);
    try {
      await collection.insertOne(report);
      console.log('Report added successfully');
      }
    catch (error) {
      console.error('Failed to add report', error);
      } 
  }

  public getAllRecords(collectionName: string): any {
    if (!this.db) {
      return Promise.reject(new Error('Database connection is not established'));
    }

    const collection: Collection = this.db.collection(collectionName);
    return collection.find({}, { projection: { _id: 1, 'report.name': 1, 'report.Date': 1 } }).toArray()
      .then((records) => {
        const formattedRecords = records.map(record => ({
          id: record._id,
          name: record.report.name,
          date: record.report.Date,
        }));
        console.log(`Fetched ${records.length} records from ${collectionName} collection`);
        return formattedRecords;
      })
      .catch((error) => {
        console.error('Failed to fetch records', error);
        return [];
      });
  }}

  



