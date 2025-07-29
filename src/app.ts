import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Hello!!' });
});

app.listen(3000, () => {
  console.log(`The server is running at http://localhost:3000`);
});
