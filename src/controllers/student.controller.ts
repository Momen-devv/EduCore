import { Request, Response } from 'express';

export const getStudents = (req: Request, res: Response) => {
  res.json({ message: 'All users' });
};
