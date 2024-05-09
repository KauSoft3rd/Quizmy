import express from 'express';
import { getNews, postBookmark, getMainNews, deleteBookmark, 
    getBookmarkNews, getNaverNewsKeyword, getNewsKeyword, getMainNewsList, getUserBookmark } from '../controllers/news.controller';
import { deleteBookmarkMiddleware, postBookmarkMiddleware } from '../middleware/news.middleware';
import { kakaoIdToUserIdMiddleware } from "../middleware/user.middleware.js";

export const newsRouter = express.Router();

newsRouter.get('/', kakaoIdToUserIdMiddleware, getNews); // clear

// newsRouter.get('/', kakaoIdToUserIdMiddleware, getMainNewsList); // clear
newsRouter.get('/mainnews', kakaoIdToUserIdMiddleware, getMainNews); // clear
newsRouter.post('/bookmark', kakaoIdToUserIdMiddleware, postBookmarkMiddleware, postBookmark); // clear
newsRouter.delete('/bookmark', kakaoIdToUserIdMiddleware, deleteBookmarkMiddleware, deleteBookmark); // clear
newsRouter.get('/bookmark', kakaoIdToUserIdMiddleware, getUserBookmark); // clear

newsRouter.get('/keyword', kakaoIdToUserIdMiddleware, getNewsKeyword); // 
newsRouter.get('/keywordNews', kakaoIdToUserIdMiddleware, getNaverNewsKeyword); //

newsRouter.get('/test', kakaoIdToUserIdMiddleware, getMainNewsList);