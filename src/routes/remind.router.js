import express from 'express';
import { getRemindQuizMiddleware } from "../middleware/remind.middleware";
import { getRemindTotal, getRemindToday, getRemindNewest, getRemindAlpha } from '../controllers/remind.controller';
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";
import { remindMiddleware } from '../middleware/remind.middleware.js'

export const remindRouter = express.Router();

remindRouter.get('/', kakaoIdToUserIdMiddleware, remindMiddleware);


// remindRouter.get('/acc', kakaoIdToUserIdMiddleware, getRemindTotal);
// remindRouter.get('/today', kakaoIdToUserIdMiddleware, getRemindToday);
// remindRouter.get('/newest', kakaoIdToUserIdMiddleware, getRemindNewest);
// remindRouter.get('/alpha', kakaoIdToUserIdMiddleware, getRemindAlpha);


// remindRouter.get('/today/newest');
// remindRouter.get('/today/alpha');
// remindRouter.get('/today/correct');
// remindRouter.get('/today/incorrect');

// remindRouter.get('/acc/newest');
// remindRouter.get('/acc/alpha');
// remindRouter.get('/acc/correct');
// remindRouter.get('/acc/incorrect');