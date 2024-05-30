import express from 'express';
// import { getRemindTotal, getRemindToday, getRemindNewest, getRemindAlpha } from '../controllers/remind.controller';
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";
import { remindMiddleware } from '../middleware/remind.middleware.js'

export const remindRouter = express.Router();

remindRouter.get('/', kakaoIdToUserIdMiddleware, remindMiddleware);


import { updateWordsLevel } from '../controllers/remind.controller.js';
remindRouter.get('/updateDB', kakaoIdToUserIdMiddleware, updateWordsLevel);