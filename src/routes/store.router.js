import express from "express";
import asyncHandler from 'express-async-handler';
import { addPoint, geItem, getAllItem, getPoint, purchaseItem, useItem, getTicket, purchaseBook } from "../controllers/store.controller";
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware";

export const storeRouter = express.Router();

// 아이템 구매
storeRouter.patch("/purchase", kakaoIdToUserIdMiddleware, asyncHandler(purchaseItem));

// 아이템 사용
storeRouter.patch("/use", kakaoIdToUserIdMiddleware, asyncHandler(useItem));

// 아이템 전체 조회
storeRouter.get("/item", kakaoIdToUserIdMiddleware, asyncHandler(getAllItem));

// 특정 아이템 조회


// 포인트 구매(증가)
// 결제 시스템 도입해야
storeRouter.patch("/point", kakaoIdToUserIdMiddleware, asyncHandler(addPoint));

// 포인트 조회
storeRouter.get("/point", kakaoIdToUserIdMiddleware, asyncHandler(getPoint));

// 뽑기 남은 횟수 조회
storeRouter.get("/ticket", kakaoIdToUserIdMiddleware, asyncHandler(getTicket));

storeRouter.patch("/quizbook", kakaoIdToUserIdMiddleware, asyncHandler(purchaseBook))