import { pool } from "../config/db.config.js"; //db
import { addCountQuizSql, countUserQuizSql, getQuizAllSql, getQuizCorrectSql, getUserLevelSql, getUserPointSql, updateUserPointSql } from "./mypage.sql.js";


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
        // 푼 단어 없을 때 0% 반환
        return '0%';
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
    
    // 푼 문제 개수 확인
    const countUserQuizData = await conn.query(countUserQuizSql, [id]);


    const getUserLevelData = await conn.query(getUserLevelSql, [id]);

    console.log('getUserLevelData: ', getUserLevelData[0][0].level);

    conn.release();
    return getUserLevelData[0][0].level;
}

// 레벨 수정
export const patchLevel = async (id, point) => {
    const conn = await pool.getConnection();

    // 값 수정
    const updateUserLevelData = await conn.query(updateUserPointSql, [point, id]);

    const getUserLevelData = await getLevel(id);

    conn.release();
    return getUserLevelData;
}

// 포인트 조회
export const getPoint = async(id) => {
    const conn = await pool.getConnection();
    const getUserPointData = await conn.query(getUserPointSql, [id]);

    console.log('getUserPointData: ', getUserPointData[0][0].point);

    conn.release();
    return getUserPointData[0][0].point;
}

// 푼 문제 개수 확인
export const countQuiz = async (id) => {
    const conn = await pool.getConnection();
    
    // 푼 문제 개수 확인
    const countUserQuizData = await conn.query(countUserQuizSql, [id]);

    conn.release();
    
    return countUserQuizData[0][0].countquiz;
}

// 퀴즈 카운트 증가
export const addCountQuiz = async (id) => {
    const conn = await pool.getConnection();
    
    // 카운트 1 증가
    const addCountQuizData = await conn.query(addCountQuizSql, [id]);

    // 푼 문제 개수 확인
    const countUserQuizData = await countQuiz(id);

    conn.release();
    
    return countUserQuizData;
}