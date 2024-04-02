import express from "express";
import asyncHandler from 'express-async-handler';
import { finishKakaoLogin, getUserInfo, kakaoLogin, levelTest, logoutUser, startKakaoLogin } from "../controllers/login.controller";

export const loginRouter = express.Router();

// 로그인
loginRouter.post("/kakao", asyncHandler(kakaoLogin));

// 콜백
// loginRouter.get("/kakao/callback", asyncHandler(finishKakaoLogin));

// 사용자 정보 조회
loginRouter.get('/me', getUserInfo);

// 로그아웃
loginRouter.get('/logout', logoutUser);

// 레벨테스트
loginRouter.post('/level', asyncHandler(levelTest));