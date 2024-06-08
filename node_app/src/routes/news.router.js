import express from 'express';
import { postBookmark, deleteBookmark, getNaverNewsKeyword, getNewsKeyword, getUserBookmark } from '../controllers/news.controller.js';
import { deleteBookmarkMiddleware, postBookmarkMiddleware } from '../middleware/news.middleware.js';
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";

export const newsRouter = express.Router();

newsRouter.post('/bookmark', kakaoIdToUserIdMiddleware, postBookmarkMiddleware, postBookmark); // 스크랩 추가하기
newsRouter.delete('/bookmark', kakaoIdToUserIdMiddleware, deleteBookmarkMiddleware, deleteBookmark); // 스크랩 삭제하기
newsRouter.get('/bookmark', kakaoIdToUserIdMiddleware, getUserBookmark); // 스크랩 목록 조회하기
newsRouter.get('/keyword', kakaoIdToUserIdMiddleware, getNewsKeyword); // 키워드 획득하기
newsRouter.get('/keywordNews', kakaoIdToUserIdMiddleware, getNaverNewsKeyword); // 키워드로 뉴스 조회하기

import { getHeadlineNews } from '../controllers/news.controller.js';
newsRouter.get('/mainnews', kakaoIdToUserIdMiddleware, getHeadlineNews); // 헤드라인 뉴스 조회하기

import { getNewsFromDB } from '../controllers/news.controller.js';
newsRouter.get('/', kakaoIdToUserIdMiddleware, getNewsFromDB); // 크롤링되어있는 뉴스 조회하기