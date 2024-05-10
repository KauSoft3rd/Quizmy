import { deleteBookmarkSql, getBookmarkListSql, getRandomKeywordSql, postBookmarkSql, getRemindWordsTodaySql, getBookmarkData } from "./news.sql";
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
        console.log(bookmarkGroup);
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
        return error;
    }
}

/*
DAO 4 : 사용자의 단어 목록 중 4개를 조회
*/

export const getNewsKeywordDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [remindList] = await db.query(getUserRemindWordsIdSql, [user_id]);
        const [todayList] = await db.query(getRemindWordsTodaySql, [user_id]);

        
        const randomKeywordId = randomFourKeywordSelectService(remindList);
        const randomKeyword = [];
        for (let i = 0; i < randomKeywordId.length; i++) {
            let [[word]] = await db.query(getRandomKeywordSql, [randomKeywordId[i].words_id]);
            randomKeyword.push(word.word);
        }
        db.release();
        return randomKeyword;
    } catch ( error ) {
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
        return error;
    }
};