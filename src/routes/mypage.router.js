import express from "express";
import asyncHandler from 'express-async-handler';
import { addCountQuiz, addQuizPoint, getAllUserId, getLevel, getQuiz, getStreak, getTodayQuiz, getWeeklyStreak, ticketColor, updateUserData, updateWeeklyPercent } from "../controllers/mypage.controller";
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware";

export const mypageRouter = express.Router();

// 위클리 퀴즈 정답률 조회
mypageRouter.get("/quiz", kakaoIdToUserIdMiddleware, asyncHandler(getQuiz));

// 오늘 스트릭 조회
mypageRouter.get("/streak/today", kakaoIdToUserIdMiddleware, asyncHandler(getStreak));

// 유저 레벨 조회
mypageRouter.get("/level", kakaoIdToUserIdMiddleware, asyncHandler(getLevel));

// 퀴즈 카운트 증가
mypageRouter.patch("/count", kakaoIdToUserIdMiddleware, asyncHandler(addCountQuiz));

// 전체 유저 조회
mypageRouter.get("/user", asyncHandler(getAllUserId));

// 전체 유저인포 갱신(0시)
mypageRouter.patch("/user", asyncHandler(updateUserData));

// 오늘 퀴즈 정답률 조회
mypageRouter.get("/quiz/today", kakaoIdToUserIdMiddleware, asyncHandler(getTodayQuiz));

// 위클리 스트릭 갱신
mypageRouter.patch("/streak", kakaoIdToUserIdMiddleware, asyncHandler(updateWeeklyPercent));

// 위클리 스트릭 조회
mypageRouter.get("/streak", kakaoIdToUserIdMiddleware, asyncHandler(getWeeklyStreak));

// 포인트 구매
mypageRouter.patch("/point", kakaoIdToUserIdMiddleware, asyncHandler(addQuizPoint));

// 컬러칩 조회
mypageRouter.get("/color", kakaoIdToUserIdMiddleware, asyncHandler(ticketColor))