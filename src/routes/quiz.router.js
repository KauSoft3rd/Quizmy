import express from 'express';
import { getQuizWord, patchRemindWord, getTodayWords, getAccWords, getCorrectWords, getIncorrectWords } from '../controllers/quiz.controller';

export const quizRouter = express.Router();

quizRouter.get('/', getQuizWord); // test
quizRouter.patch('/', patchRemindWord); //
quizRouter.get('/today', getTodayWords); //  
quizRouter.get('/acc', getAccWords); //
quizRouter.get('/correct', getCorrectWords);
quizRouter.get('/incorrect', getIncorrectWords);