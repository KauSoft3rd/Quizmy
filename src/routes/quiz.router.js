import express from 'express';
import { getQuizWord, patchRemindWord } from '../controllers/quiz.controller';

export const quizRouter = express.Router();

quizRouter.get('/', getQuizWord); // test
quizRouter.patch('/', patchRemindWord);