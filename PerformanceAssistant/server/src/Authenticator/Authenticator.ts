// Authenticator.ts
export interface UserCredentials {
  UserName: string;
  Password: string;
}

export class Authenticator {
  constructor() {
    // Initialize users array or perform any necessary setup
  }

  // Method to authenticate a user
  authenticate(userCredentials: UserCredentials): boolean {
    //  authentication logic - needs to be replaced  with  actual logic
    if (1) {
      return true;
    } else {
      return false;
    }
  }
}
