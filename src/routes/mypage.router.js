import express from "express";
import asyncHandler from 'express-async-handler';
import { addCountQuiz, getAllUserId, getLevel, getQuiz, getStreak, updateUserData } from "../controllers/mypage.controller";
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware";

export const mypageRouter = express.Router();

mypageRouter.get("/quiz", kakaoIdToUserIdMiddleware, asyncHandler(getQuiz));

mypageRouter.get("/streak", kakaoIdToUserIdMiddleware, asyncHandler(getStreak));

mypageRouter.get("/level", kakaoIdToUserIdMiddleware, asyncHandler(getLevel));

mypageRouter.patch("/quiz", kakaoIdToUserIdMiddleware, asyncHandler(addCountQuiz));

mypageRouter.get("/user", asyncHandler(getAllUserId));

mypageRouter.patch("/user", asyncHandler(updateUserData));
