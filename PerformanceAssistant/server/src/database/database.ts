import { MongoClient, Db, Collection } from 'mongodb';
import { UserCredentials } from '../authenticator/authenticator';

interface User {
  username: string;
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
      console.log(this.db);
      throw new Error('Database connection is not established');
    }

    const usersCollection: Collection = this.db.collection('PerformanceAssistance');

    let collection = await usersCollection.find({}).toArray();
    if (collection.length > 0 && collection[0].users) {
      const users: Record<string, User> = collection[0].users;

      // Extract and log each user's data
      for (const [userId, userData] of Object.entries(users)) {
        const db_username = userData.username;
        const db_password = userData.password;
        if (db_username === userCredentials.username && db_password === userCredentials.password) {
          return true;
        }
      }
    } else {
      console.log('No users found in the collection');
    }
  }
}
