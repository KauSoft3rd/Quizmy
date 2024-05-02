import express from 'express';
import { getRemindQuizMiddleware } from "../middleware/remind.middleware";
import { getRemindTotal, getRemindToday, getRemindNewest, getRemindAlpha } from '../controllers/remind.controller';

export const remindRouter = express.Router();

remindRouter.get('/', getRemindQuizMiddleware);
remindRouter.get('/acc', getRemindTotal);
remindRouter.get('/today', getRemindToday);
remindRouter.get('/newest', getRemindNewest);
remindRouter.get('/alpha', getRemindAlpha);