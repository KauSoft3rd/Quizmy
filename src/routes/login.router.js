import express from "express";
import asyncHandler from 'express-async-handler';
import { finishKakaoLogin, getUserInfo, kakaoLogin, levelTest, logoutUser, startKakaoLogin } from "../controllers/login.controller";
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";

export const loginRouter = express.Router();

// 로그인
loginRouter.post("/kakao", kakaoIdToUserIdMiddleware, asyncHandler(kakaoLogin));

// 콜백
// loginRouter.get("/kakao/callback", asyncHandler(finishKakaoLogin));

// 사용자 정보 조회
loginRouter.get('/me', kakaoIdToUserIdMiddleware, getUserInfo);

// 레벨테스트
loginRouter.post('/level', kakaoIdToUserIdMiddleware, asyncHandler(levelTest));