import express from 'express';
import { getNews } from '../controllers/news.controller';

export const newsRouter = express.Router();


newsRouter.get('/', getNews);