import { getWordInfoSql, getUserWorkbookLevelSql, getWordsUnderUserLevelSql, getUserRemindListSql, todayRemindListSql } from "./remind.sql";
import { pool } from "../config/db.config";

// 사용자 퀴즈북 레벨 조회
export const getUserQuizbookLevelDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [quizbookLevel] = await db.query(getUserWorkbookLevelSql, [user_id]); // 사용자의 퀴즈북 레벨 조회
        const [wordsList] = await db.query(getWordsUnderUserLevelSql, quizbookLevel[0].quizbook); // 레벨보다 낮은 모든 단어를 조회
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