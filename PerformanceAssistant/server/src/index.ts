import express, { Request, Response } from 'express';
import { Authenticator, UserCredentials } from './Authenticator/Authenticator';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.post('/login', (req: Request, res: Response) => 
  {     
      const { UserName, Password } = req.body;
      

      const authenticator = new Authenticator();

      const userCredentials: UserCredentials = {
        UserName : "admin",
        Password : "admin"
      };

      let ans = authenticator.authenticate(userCredentials);
      console.log(ans)
      if(ans)
        res.send('Valid Crendtials!');
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });