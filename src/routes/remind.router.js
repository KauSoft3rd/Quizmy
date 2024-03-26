import express from 'express';
import { getRemindQuiz } from "../middleware/remind.middleware";

export const remindRouter = express.Router();

remindRouter.get('/', getRemindQuiz);