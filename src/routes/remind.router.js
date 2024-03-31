import express from 'express';
import { getRemindQuizMiddleware } from "../middleware/remind.middleware";
import { getRemindTotal, getRemindToday } from '../controllers/remind.controller';

export const remindRouter = express.Router();

remindRouter.get('/', getRemindQuizMiddleware);
remindRouter.get('/acc', getRemindTotal);
remindRouter.get('/today', getRemindToday);