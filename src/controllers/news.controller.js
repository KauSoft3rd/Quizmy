import axios from 'axios';
import cheerio from 'cheerio';
import iconv from 'iconv-lite';
import { response } from '../config/response';
import { status } from '../config/response.status';

/*
API 1 : 네이버페이 증권 사이트의 주요 뉴스 크롤링 API
반환결과 : [ { 뉴스 제목 / 신문사 / 링크 / 날짜 / 이미지 주소 }, ]
*/

export const getNews = async (req, res, next) => {
    try {
        let html = await axios.get("https://finance.naver.com/news/mainnews.naver", 
        { responseType: 'arraybuffer' }); //사이트의 html을 읽어온다
        let encodedData = iconv.decode(html.data, "EUC-KR");
        let $ = cheerio.load(encodedData);
        let newsData = $('.newsList .block1');

        const newsList = [];

        newsData.each((idx, node) => {
            let title = $(node).find('.articleSubject a').text().trim();
            let company = $(node).find('.articleSummary .press').text().trim();
            let link = $(node).find('.articleSubject a').attr('href');
            let date = $(node).find('.articleSummary .wdate').text().trim();
            let img = $(node).find('.thumb a img').attr('src');

            newsList.push({ title, company, link, date, img });
        })
        return res.send(response(status.SUCCESS, newsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}