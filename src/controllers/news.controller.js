import axios from 'axios';
import cheerio from 'cheerio';
import { response } from '../config/response';
import { status } from '../config/response.status';



export const getNews = async (req, res, next) => {
    try {
        return res.send(response(status.SUCCESS));
    } catch (error) {
        console.log(error);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}