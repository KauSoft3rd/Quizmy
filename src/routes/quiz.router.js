import express from 'express';
import { getQuizWord } from '../controllers/quiz.controller';

export const quizRouter = express.Router();

quizRouter.get('/', getQuizWord);