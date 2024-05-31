import express, { Request, Response } from 'express';
import { Authenticator, UserCredentials } from './authenticator/authenticator';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const authenticator = new Authenticator();
  const userCredentials: UserCredentials = { username, password };

  let r = await authenticator.authenticate(userCredentials);
  res.send(r);

});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
