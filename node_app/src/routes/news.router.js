import express from 'express';
import { getNews, postBookmark, getMainNews, deleteBookmark, 
    getNaverNewsKeyword, getNewsKeyword, getUserBookmark } from '../controllers/news.controller.js';
import { deleteBookmarkMiddleware, postBookmarkMiddleware } from '../middleware/news.middleware.js';
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";

export const newsRouter = express.Router();

// newsRouter.get('/test', kakaoIdToUserIdMiddleware, getNews); // clear

// newsRouter.get('/', kakaoIdToUserIdMiddleware, getMainNewsList); // clear
// newsRouter.get('/mainnews', kakaoIdToUserIdMiddleware, getMainNews); // 상단 뉴스 조회하기
newsRouter.post('/bookmark', kakaoIdToUserIdMiddleware, postBookmarkMiddleware, postBookmark); // 스크랩 추가하기
newsRouter.delete('/bookmark', kakaoIdToUserIdMiddleware, deleteBookmarkMiddleware, deleteBookmark); // 스크랩 삭제하기
newsRouter.get('/bookmark', kakaoIdToUserIdMiddleware, getUserBookmark); // 스크랩 목록 조회하기
newsRouter.get('/keyword', kakaoIdToUserIdMiddleware, getNewsKeyword); // 키워드 획득하기
newsRouter.get('/keywordNews', kakaoIdToUserIdMiddleware, getNaverNewsKeyword); // 키워드로 뉴스 조회하기

import { getNewsFromDB } from '../controllers/news.controller.js';
newsRouter.get('/', kakaoIdToUserIdMiddleware, getNewsFromDB);
// newsRouter.get('/test', kakaoIdToUserIdMiddleware, getMainNewsList);