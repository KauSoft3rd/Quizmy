import axios from 'axios';
import cheerio from 'cheerio';
import { response } from '../config/response';
import { status } from '../config/response.status';



const getHTML = async () => {
    try {
        return await axios.get("https://finance.naver.com/news/news_list.naver?mode=LSS2D&section_id=101&section_id2=258");
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

const parsing = async () => {
    const html = await getHTML();
    const $ = cheerio.load(html.data);
    const $titlist = $("newsList top");
    console.log($titlist);
    let information = [];
    $titlist.each((idx, node) => {
        const title = $(node).find(".news_tit").text();  
        informations.push({
            title: $(node).find(".news_tit:eq(0)").text(), // 뉴스제목 크롤링
            press: $(node).find(".info_group > a").text(), // 출판사 크롤링
            time: $(node).find(".info_group > span").text(), // 기사 작성 시간 크롤링
            contents: $(node).find(".dsc_wrap").text(), // 기사 내용 크롤링
        })
        console.log(informations);
    });
}



export const getNews = async (req, res, next) => {
    try {
        parsing();
        return res.send(response(status.SUCCESS));
    } catch (error) {
        console.log(error);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}