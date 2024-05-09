import express from 'express';
import { getRemindQuizMiddleware } from "../middleware/remind.middleware";
import { getRemindTotal, getRemindToday, getRemindNewest, getRemindAlpha } from '../controllers/remind.controller';
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";

export const remindRouter = express.Router();

remindRouter.get('/', kakaoIdToUserIdMiddleware, getRemindQuizMiddleware);
remindRouter.get('/acc', kakaoIdToUserIdMiddleware, getRemindTotal);
remindRouter.get('/today', kakaoIdToUserIdMiddleware, getRemindToday);
remindRouter.get('/newest', kakaoIdToUserIdMiddleware, getRemindNewest);
remindRouter.get('/alpha', kakaoIdToUserIdMiddleware, getRemindAlpha);