import express from 'express';
import { getNews, postBookmark, getMainNews, deleteBookmark, getBookmarkNews } from '../controllers/news.controller';
import { deleteBookmarkMiddleware, postBookmarkMiddleware } from '../middleware/news.middleware';

export const newsRouter = express.Router();

newsRouter.get('/', getNews);
newsRouter.get('/mainnews', getMainNews);
newsRouter.post('/bookmark', postBookmarkMiddleware, postBookmark);
newsRouter.delete('/bookmark', deleteBookmarkMiddleware, deleteBookmark);
newsRouter.get('/bookmark', getBookmarkNews);