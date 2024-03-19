import axios from 'axios';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { response } from '../config/response';
import { status } from '../config/response.status';
import { database } from '../config/database';
import { calculateDate, getBookmarkNewsDB } from '../services/new.service';

/*
API 1 : 네이버페이 증권 사이트의 주요 뉴스 크롤링 API
반환결과 : [ { 뉴스 제목 / 신문사 / 링크 / 시간차이 / 이미지 주소 }, ]
*/

export const getNews = async (req, res, next) => {
    try {
        let html = await axios.get("https://finance.naver.com/news/mainnews.naver", 
        { responseType: 'arraybuffer' }); //사이트의 html을 읽어온다
        let encodedData = iconv.decode(html.data, "EUC-KR");
        let $ = cheerio.load(encodedData);
        let newsData = $('.newsList .block1');

        const newsList = [];
        const nowDate = new Date();
        const urlList = await getBookmarkNewsDB();

        newsData.each((idx, node) => {
            let title = $(node).find('.articleSubject a').text().trim();
            let company = $(node).find('.articleSummary .press').text().trim();
            let link = $(node).find('.articleSubject a').attr('href');
            let date = new Date($(node).find('.articleSummary .wdate').text().trim());
            let img = $(node).find('.thumb a img').attr('src');
            let timeDiff = calculateDate(date, nowDate);
            let check = urlList.includes(link);
            newsList.push({ title, company, link, date: timeDiff, img, check });
        });

        return res.send(response(status.SUCCESS, newsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 2 : 뉴스 북마크 추가 API
요청형식 : 기사url (string)
반환결과 : 
*/

export const postBookmark = async (req, res, next) => {
    try {
        const urlList = database.query('SELECT * from News', (error, rows, fields) => {
            if (error) throw error;
            console.log(rows);
        });

        return res.send(response(status.SUCCESS));

    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 3 : 뉴스 북마크 제거 API
요청형식 : 기사url (string)
반환결과 : 
*/

export const deleteBookmark = async (req, res, next) => {
    try {
        return res.send(response(status.SUCCESS));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 4 : 뉴스 메인화면 기사 제공 API
요청형식 : 
반환결과 : { 뉴스 제목 / 신문사 / 링크 / 날짜 / 이미지 주소 }
*/

export const getMainNews = async (req, res, next) => {
    try {
        let html = await axios.get("https://finance.naver.com/news/mainnews.naver", 
        { responseType: 'arraybuffer' }); //사이트의 html을 읽어온다
        let encodedData = iconv.decode(html.data, "EUC-KR");
        let $ = cheerio.load(encodedData);
        let newsData = $('#contentarea_left > div.mainNewsList._replaceNewsLink > ul > li:nth-child(1) > dl');
        let nowDate = new Date();

        let date = new Date(newsData.find('.articleSummary .wdate').text().trim());
        let timeDiff = calculateDate(date, nowDate);

        let mainNews = {
            title: newsData.find('.articleSubject a').text().trim(),
            company: newsData.find('.articleSummary .press').text().trim(),
            link: newsData.find('.articleSubject a').attr('href'),
            date: timeDiff,
            img: newsData.find('.thumb a img').attr('src')
        }

        return res.send(response(status.SUCCESS, mainNews));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}
