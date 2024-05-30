import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 9898;

app.get('/greeting', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });