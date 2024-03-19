import express from 'express';
import { getNews, postBookmark, getMainNews } from '../controllers/news.controller';
import { checkBookmark } from '../middleware/news.middleware';

export const newsRouter = express.Router();

newsRouter.get('/', getNews);
newsRouter.get('/bookmark', postBookmark);
newsRouter.get('/mainnews', getMainNews);
newsRouter.get('/test', checkBookmark)