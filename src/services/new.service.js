import axios from 'axios';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { response } from '../config/response';
import { status } from '../config/response.status';
import { database } from '../config/database';

/*
Service 1 : 시간차이를 반환하는 서비스
*/

export const calculateDate = (d1, d2) => {
    let diffTime = Math.abs(d2 - d1);
    let diffHour = diffTime / (1000 * 60 * 60);

    let timeDiff;

    if (diffHour < 1) { timeDiff = `${Math.floor(diffTime / (1000 * 60))}분`; } 
    else { timeDiff = `${Math.floor(diffHour)}시간` }
    return timeDiff;
}

/*
Service 2 : 북마크에 존재하는 기사인지 확인하는 서비스
*/

export const getBookmarkNewsDB = () => {
    return new Promise((resolve, reject) => {
        database.query('SELECT link from News', (error, rows, fields) => {
            if (error) reject(error);
            const links = rows.map(row => row.link);
            resolve(links);
        });
    });
};

/*

*/