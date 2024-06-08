import express from 'express';
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";
import { remindMiddleware } from '../middleware/remind.middleware.js'

export const remindRouter = express.Router();

remindRouter.get('/', kakaoIdToUserIdMiddleware, remindMiddleware);

import { updateWordsLevel } from '../controllers/remind.controller.js';
remindRouter.get('/updateDB', kakaoIdToUserIdMiddleware, updateWordsLevel);