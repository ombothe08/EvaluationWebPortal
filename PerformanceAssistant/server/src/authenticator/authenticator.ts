import { Database } from '../database/database';

export interface UserCredentials {
  username: string;
  password: string;
}

export class Authenticator {
  private database: Database | undefined;

  public async authenticate(userCredentials: UserCredentials): Promise<boolean | any> {

    this.database = new Database('mongodb://localhost:27017', 'PerformanceAssistance_DB');
    await this.database.connectToDatabase();

    let result = await this.database.verifyUserCredentials(userCredentials);
    return result;
   }  
}
