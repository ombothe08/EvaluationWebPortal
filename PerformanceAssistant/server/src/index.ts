import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.post('/login', (req: Request, res: Response) => {
    console.log(req.body);

    res.send('Hello, xTypeScript Express!');
  });

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });