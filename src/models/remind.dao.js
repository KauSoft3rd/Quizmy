import { getWordInfoSql, getUserWorkbookLevel, getWordsUnderUserLevel, getUserRemindListSql, todayRemindListSql } from "./remind.sql";
import { pool } from "../config/db.config";

// 사용자 퀴즈북 레벨 조회
export const getUserQuizbookLevel = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [quizbookLevel] = await db.query(getUserWorkbookLevel, [user_id]);
        const [wordsList] = await db.query(getWordsUnderUserLevel, quizbookLevel[0].quizbook);
        db.release();
        return wordsList;
    } catch ( error ) {
        return error;
    }
}

// 사용자가 시도한 누적 단어를 조회
export const getWordsInfoDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(getUserRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }))
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}

// 사용자가 시도한 당일 단어를 조회
export const getTodayRemindDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [userRemindList] = await db.query(todayRemindListSql, [user_id]);
        const remindList = await Promise.all(userRemindList.map(async (item) => {
            const [info] = await db.query(getWordInfoSql, [item.words_id]);
            return { item, info };
        }))
        db.release();
        return remindList;
    } catch ( error ) {
        return error;
    }
}

