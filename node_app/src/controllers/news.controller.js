import axios from 'axios';
import { response } from '../config/response';
import { status } from '../config/response.status';
import { getBookmarkNewsDBDao, getNewsKeywordDao, getUserBookmarkDao } from '../models/news.dao';
import { calculateDate, getNewsImageURL, getTimeDiff } from '../services/new.service';

/*
API 2 : 뉴스 북마크 추가 API
요청형식 : 기사url (string)
반환결과 : 
*/

import { postBookmarkDao } from '../models/news.dao';
export const postBookmark = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const { link, title, img } = req.body;
        await postBookmarkDao(user_id, link, title, img);
        return res.send(response(status.SUCCESS, "뉴스가 북마크에 추가되었습니다."));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 3 : 뉴스 북마크 제거 API
요청형식 : 기사url (string)
반환결과 : 
*/

import { deleteBookmarkDao } from '../models/news.dao';
export const deleteBookmark = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const { link } = req.query;
        console.log(user_id, link);
        await deleteBookmarkDao(user_id, link);
        return res.send(response(status.SUCCESS, "뉴스가 북마크에서 삭제되었습니다."));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 4 : 사용자의 북마크 조회
요청형식 : 
반환결과 : { 뉴스 링크 }
*/

export const getBookmarkNews = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const bookmarkList = await getBookmarkNewsDBDao(user_id); // 사용자의 북마크 목록을 조회
        return res.send(response(status.SUCCESS, bookmarkList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

export const getUserBookmark = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const bookmarkList = await getUserBookmarkDao(user_id); // 사용자의 북마크 목록을 조회
        console.log(bookmarkList);
        return res.send(response(status.SUCCESS, bookmarkList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 6 : 네이버 키워드 뉴스 API
요청형식 : 
반환결과 : { 뉴스 제목 / 신문사 / 링크 / 날짜 / 이미지 주소 }
*/

import { keywordNewsCalculateDate } from '../services/new.service';
export const getNaverNewsKeyword = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const { keyword } = req.query;
        const sort = 'sim'; // 날짜순으로 정렬 유사도 정렬을 원할 경우 'sim'
        const display = 5; // 한번에 읽어올 뉴스의 갯수
        const api_url = `https://openapi.naver.com/v1/search/news.json?query=${encodeURI(keyword)}&display=${display}&sort=${sort}`;

        const newsList = await axios.get(api_url, {
            headers: { 
                'X-Naver-Client-id':process.env.NAVER_ID,
                'X-Naver-Client-Secret': process.env.NAVER_SECRET
            },
        });

        const now = new Date(); // 현재 시각
        const items = newsList.data.items;
        const bookmarkList = await getBookmarkNewsDBDao(user_id); // 스크랩 유무를 확인하기 위한 조회
        const keywordNewsList = await Promise.all(items.map(async (item) => {
            var title = item.title.replace(/<[^>]*>?/gm, ''); // html 태그 제거
            title = title.replace(/&quot;/g, '"'); // &quot; 문자를 "로 변환
            title = title.replace(/\//g, ' '); // 슬래시(/)를 공백으로 변환
            var link = item.link;
            var date = item.pubDate;
            var image = await getNewsImageURL(link); 
            var check = bookmarkList.some(item => item.link === link);

            const newsDate = new Date(date);
            const timeDiff = keywordNewsCalculateDate(newsDate, now);
            console.log(timeDiff);
            return {
                title: title,
                newsLink: link,
                date: timeDiff,
                img: image,
                check: check,
            };
        }));

        return res.send(response(status.SUCCESS, keywordNewsList));
    } catch ( error ) {
        console.log(error);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 7 : 키워드 검색을 위한 단어를 제시
요청형식 : 
반환결과 : { 뉴스 제목 / 신문사 / 링크 / 날짜 / 이미지 주소 }
*/

export const getNewsKeyword = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const randomKeyword = await getNewsKeywordDao(user_id);
        console.log(randomKeyword);
        return res.send(response(status.SUCCESS, randomKeyword));
    } catch ( error ) {
        console.log(error);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 9 : 데이터 베이스의 뉴스를 조회
요청형식 : 
반환결과 : 
*/

import { getNewsDateDao } from '../models/news.dao';
export const getNewsFromDB = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const bookmarkList = await getBookmarkNewsDBDao(user_id); // 사용자의 스크랩 리스트를 조회
        const newsList = await getNewsDateDao(); // DB에 저장된 크롤링 뉴스를 조회
        const nowDate = new Date();

        const resultList = [];

        for (const node of newsList) {
            const { title, company, newsLink, date, img } = node;
            const timeDiff = calculateDate(date, nowDate);
            const check = bookmarkList.some(item => item.link === newsLink);
            resultList.push({ title: title, company: company, newsLink: newsLink, date: timeDiff, img: img, check: check });
        }
        console.log(resultList.slice(1));
        return res.send(response(status.SUCCESS, resultList.slice(1)));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}


// DB에서 헤드라인 뉴스 1개를 제공
import { getHeadlineNewsDao } from '../models/news.dao';
export const getHeadlineNews = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const bookmarkList = await getBookmarkNewsDBDao(user_id); // 사용자의 스크랩 리스트를 조회
        // console.log("아래는 사용자의 북마크 리스트");
        // console.log(bookmarkList);
        const headline = await getHeadlineNewsDao(); // DB에 저장된 크롤링 뉴스를 조회
        // console.log("아래는 헤드라인 뉴스 링크");
        // console.log(headline);
        const nowDate = new Date();
        let chk = false;
        // if (bookmarkList.includes(headline[0].newsLink)) chk = true;
        bookmarkList.forEach(bookmark => {
            if (decodeURIComponent(bookmark.link) === decodeURIComponent(headline[0].newsLink)) {
                chk = true;
            }
        });

        const result = {
            title: headline[0].title,
            company: headline[0].company,
            newsLink: headline[0].newsLink.replace(/"/g, ''),
            date: calculateDate(headline[0].date, nowDate),
            img: headline[0].img,
            check: chk
        }

        console.log(result);
        return res.send(response(status.SUCCESS, result));
    } catch ( error ) {
        console.log(error);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}