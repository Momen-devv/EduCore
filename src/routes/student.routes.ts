import express from 'express';
import { getStudents } from '../controllers/student.controller';

const router = express.Router();

router.get('/', getStudents);

export default router;
