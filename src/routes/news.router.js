import express from 'express';
import { getNews, postBookmark, getMainNews, deleteBookmark, 
    getBookmarkNews, getNaverNewsKeyword, getNewsKeyword, getMainNewsList, getUserBookmark } from '../controllers/news.controller';
import { deleteBookmarkMiddleware, postBookmarkMiddleware } from '../middleware/news.middleware';

export const newsRouter = express.Router();

newsRouter.get('/', getNews); // clear

// newsRouter.get('/', getMainNewsList); // clear
newsRouter.get('/mainnews', getMainNews); // clear
newsRouter.post('/bookmark', postBookmarkMiddleware, postBookmark); // clear
newsRouter.delete('/bookmark', deleteBookmarkMiddleware, deleteBookmark); // clear
newsRouter.get('/bookmark', getUserBookmark); // clear

newsRouter.get('/keyword', getNewsKeyword); // 
newsRouter.get('/keywordNews', getNaverNewsKeyword); //

newsRouter.get('/test', getMainNewsList);