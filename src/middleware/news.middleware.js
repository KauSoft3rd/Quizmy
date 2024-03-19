import axios from 'axios';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { response } from '../config/response';
import { status } from '../config/response.status';
import { database } from '../config/database';

/*
MIDDLE WARE 1 : 해당 뉴스가 북마크에 존재하는 뉴스인지 확인하는 미들웨어
요청형식 : 기사url (string)
반환결과 : 
*/

export const checkBookmark = async (req, res, next) => {
    try {
        const { user_id, link } = req.query;
        const data = await new Promise((resolve, reject) => {
            database.query('SELECT * FROM News WHERE user_id = ? AND link = ?', [user_id, link], (error, rows, fields) => {
                if (error) reject(error);
                else resolve(rows);
            });
        });
        if (data[0] == null) console.log("not exist");
        console.log("exist");
        return res.send(response(status.SUCCESS));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}