import express from "express";
import asyncHandler from 'express-async-handler';
import { getLevel, getQuiz, getStreak } from "../controllers/mypage.controller";
import { verifyToken } from "../middleware/jwt.middleware";

export const mypageRouter = express.Router();

mypageRouter.get("/quiz", verifyToken, asyncHandler(getQuiz));

mypageRouter.get("/streak", verifyToken, asyncHandler(getStreak));

mypageRouter.get("/level", verifyToken, asyncHandler(getLevel));

