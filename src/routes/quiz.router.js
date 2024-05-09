import express from 'express';
import { getQuizWord, patchRemindWord, getTodayWords, getAccWords, getCorrectWords, getIncorrectWords, reqChatGPT } from '../controllers/quiz.controller';
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";

export const quizRouter = express.Router();

quizRouter.get('/', kakaoIdToUserIdMiddleware, getQuizWord); // test
quizRouter.patch('/', kakaoIdToUserIdMiddleware, patchRemindWord); //
quizRouter.get('/today', kakaoIdToUserIdMiddleware, getTodayWords); //  
quizRouter.get('/acc', kakaoIdToUserIdMiddleware, getAccWords); //
quizRouter.get('/correct', kakaoIdToUserIdMiddleware, getCorrectWords);
quizRouter.get('/incorrect', kakaoIdToUserIdMiddleware, getIncorrectWords);

quizRouter.post('/chat', kakaoIdToUserIdMiddleware, reqChatGPT); //