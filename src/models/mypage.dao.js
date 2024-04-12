import { pool } from "../config/db.config.js"; //db
import { getQuizAllSql, getQuizCorrectSql, getUserPointSql } from "./mypage.sql.js";


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
// 맞춘 단어 개수 반환
// 오늘꺼만 보내줘도 되는지 아니면 일주일치 계속 보내줘야하는지 
// 일단 오늘 맞춘 개수만 반환
export const getStreak = async (id) => {
    const conn = await pool.getConnection();
    const getQuizCorrectData = await conn.query(getQuizCorrectSql, [id]);

    console.log('getQuizCorrectData: ', getQuizCorrectData[0][0]['COUNT(*)']);

    const correctCount = getQuizCorrectData[0][0]["COUNT(*)"];

    conn.release();
    return correctCount;
}

// 유저 레벨 조회
// 포인트 조회 -> 레벨로 치환
export const getLevel = async (id) => {
    const conn = await pool.getConnection();
    const getUserPointData = await conn.query(getUserPointSql, [id]);

    console.log('getUserPointData: ', getUserPointData[0][0].point);

    // const correctCount = getQuizCorrectData[0][0]["COUNT(*)"];

    conn.release();
    return getUserPointData[0][0].point;
}