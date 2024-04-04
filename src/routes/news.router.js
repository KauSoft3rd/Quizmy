import express from 'express';
import { getNews, postBookmark, getMainNews, deleteBookmark, getBookmarkNews } from '../controllers/news.controller';
import { deleteBookmarkMiddleware, postBookmarkMiddleware } from '../middleware/news.middleware';

export const newsRouter = express.Router();

newsRouter.get('/', getNews); // clear
newsRouter.get('/mainnews', getMainNews); // clear
newsRouter.post('/bookmark', postBookmarkMiddleware, postBookmark); // clear
newsRouter.delete('/bookmark', deleteBookmarkMiddleware, deleteBookmark); // clear
newsRouter.get('/bookmark', getBookmarkNews); // clear