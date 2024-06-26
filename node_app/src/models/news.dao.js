import { deleteBookmarkSql, getBookmarkListSql, getRandomKeywordSql, postBookmarkSql, getRemindWordsTodaySql, getBookmarkData } from "./news.sql.js";
import { getUserRemindWordsIdSql } from "./quiz.sql.js";
import { randomFourKeywordSelectService } from "../services/new.service.js";
import { pool } from "../config/db.config.js"; //db

/*
DAO 1 : 사용자의 스크랩 목록을 조회
*/

export const getBookmarkNewsDBDao = async (user_id) => {
    const db = await pool.getConnection();
    try {
        const [bookmarkGroup] = await db.query(getBookmarkListSql, [user_id]);
        db.release();
        return bookmarkGroup;
    } catch (error) {
        db.release();
        return error;
    }
};

/*
DAO 2 : 새로운 뉴스 기사를 스크랩
*/

export const postBookmarkDao = async (user_id, title, link, img) => {
    try {
        const db = await pool.getConnection(); // db와 연결
        await db.query(postBookmarkSql, [user_id, title, link, img]); // 데이터 삽입 쿼리 수행
        db.release(); // 연결 끊기
    } catch ( error ) { 
        db.release(); // 연결 끊기
        return error;
    }
};

/*
DAO 3 : 뉴스 기사 스크랩을 취소
*/

export const deleteBookmarkDao = async (user_id, link) => {
    try {
        const db = await pool.getConnection();
        await db.query(deleteBookmarkSql, [user_id, link]);
        db.release();
    } catch ( error ) {
        db.release(); // 연결 끊기
        return error;
    }
}

/*
DAO 4 : 사용자의 단어 목록 중 4개를 조회
*/


import { getUserNewsKeywordSql } from "./news.sql.js";
export const getNewsKeywordDao = async (user_id) => {
    let cnt = 4;
    try {
        const db = await pool.getConnection();
        // const [remindList] = await db.query(getUserRemindWordsIdSql, [user_id]);
        const [todayList] = await db.query(getUserNewsKeywordSql, [user_id]); // 사용자가 풀었던 단어 중 2개 이하 조회

        cnt -= todayList.length

        let test;
        const queryList = todayList.map(item => item.words_id);
        if (cnt !== 4) {
            test = `SELECT words_id FROM Words WHERE words_id NOT IN (${queryList.map(()=>'?').join(',')}) ORDER BY RAND() LIMIT ${cnt}`;
        }
        else {
            test = `SELECT words_id FROM Words WHERE words_id ORDER BY RAND() LIMIT ${cnt}`;
        }
        const [randomList] = await db.query(test, queryList);
        console.log(randomList); // 에러 발생

        const temp = [...todayList, ...randomList];

        const result = await Promise.all(temp.map(async (item) => {
            const [word] = await db.query(getRandomKeywordSql, [item.words_id]);
            return word[0].word;
        }));
        db.release();
        return result;
    } catch ( error ) {
        db.release(); // 연결 끊기
        return error;
    }
}

/*
DAO 5 : 사용자의 스크랩 목록을 조회
*/

export const getUserBookmarkDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [bookmarkGroup] = await db.query(getBookmarkData, [user_id]);
        db.release();
        return bookmarkGroup;
    } catch (error) {
        db.release(); // 연결 끊기
        return error;
    }
};

/*
DAO 6 : 뉴스 크롤링 업데이트 수행
*/

import { deleteCrawlingSql, updateCrawlingSql } from "./news.sql.js";
export const updateNewsDataDao = async (newsData) => {
    try {
        const db = await pool.getConnection();
        await db.query(deleteCrawlingSql); // 데이터 베이스를 날린다.

        for (const news of newsData) { // 새롭게 크롤링 정보를 삽입한다.
            const { title, company, newsLink, date, img } = news;
            await db.query(updateCrawlingSql, [title, company, newsLink, date, img]);
        }

        db.release();
    } catch ( error ) {
        db.release(); // 연결 끊기
        return error;
    }
}

/*
DAO 7 : 데이터 베이스에 저장된 뉴스 크롤링 정보를 조회
*/

import { updateNewsSql, checkNewsSql, getDB } from './news.sql.js';
export const updateNewsDao = async(newsData) => {
    const db = await pool.getConnection();
    try {
        // await db.query(deleteCrawlingSql); // 데이터 베이스를 날린다.
        for (const news of newsData) { // 새롭게 크롤링 정보를 삽입한다.
            const { title, company, newsLink, date, img } = news;
            const [rows] = await db.query(checkNewsSql, [newsLink]);
            if (rows.length === 0) {
                await db.query(updateNewsSql, [title, company, newsLink, date, img]);
            }
        }

        // 추가적인 쿼리를 이용해서 현재 DB에 정보들을 모두 정렬해야한다.

        const [temp] = await db.query(getDB);
        console.log(temp);

        db.release();
    } catch ( error ) {
        db.release(); // 연결 끊기
        return error;
    }
}


/*
DAO 8 : 데이터 베이스에 저장된 뉴스 크롤링 정보를 조회
*/

import { getNewsFromDBSql } from "./news.sql.js";
export const getNewsDateDao = async () => {
    try {
        const db = await pool.getConnection();
        let [newsList] = await db.query(getNewsFromDBSql);
        db.release();
        return newsList;
    } catch ( error ) {
        db.release(); // 연결 끊기
        return error;
    }
}


import { getHeadLineNewsSql } from './news.sql.js';
export const getHeadlineNewsDao = async () => {
    try {
        const db = await pool.getConnection();
        let [headline] = await db.query(getHeadLineNewsSql);
        db.release();
        return headline;
    } catch ( error ) {
        db.release();
        return error;
    }
}