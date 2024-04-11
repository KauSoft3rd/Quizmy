import { pool } from "../config/db.config.js"; //db
import { getQuizAllSql, getQuizCorrectSql } from "./mypage.sql.js";


// 퀴즈 정답률 조회
export const getQuiz = async (id) => {
    const conn = await pool.getConnection();
    const getQuizCorrectData = await conn.query(getQuizCorrectSql, [id]);
    const getQuizAllData = await conn.query(getQuizAllSql, [id]);

    console.log('getQuizCorrectData: ', getQuizCorrectData[0][0]['COUNT(*)']);
    console.log('getQuizAllData: ', getQuizAllData[0][0]["COUNT(*)"]);

    const correctCount = getQuizCorrectData[0][0]["COUNT(*)"];
    const allCount = getQuizAllData[0][0]["COUNT(*)"];

    conn.release();

    if (allCount > 0) {
        const ratio = (correctCount / allCount) * 100;
        const result = ratio+"%";
        return result;
    } else {
        // 푼 단어가 없을 때 - 반환
        return '-';
    }
}

// 퀴즈 스트릭 조회
export const getStreak = async (req, res) => {

}

// 유저 레벨 조회
export const getLevel = async (req, res) => {

}