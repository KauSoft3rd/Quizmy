import express from 'express';
import { getNaverNews, getNews } from '../controllers/news.controller';

export const newsRouter = express.Router();

newsRouter.get('/', getNews);