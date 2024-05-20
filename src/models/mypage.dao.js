import { pool } from "../config/db.config.js"; //db
import { addCountQuizSql, countUserQuizSql, getAllUserIdsSql, getAllUserWeekPercentSql, getQuizAllSql, getQuizCorrectSql, getTodayQuizDataSql, getTodayStreakSql, getUserLevelSql, getUserPointSql, getWeeklySql, getWeeklyStreakSql, insertTodayPercentSql, updateUserPointSql, updateWeeklySql, updateWeeklyStreakSql, updatetodayStreakSql } from "./mypage.sql.js";

// today 퀴즈 정답률 조회
// 테이블에도 추가해야
export const getTodayQuiz = async (id) => {
    const conn = await pool.getConnection();
    const getQuizCorrectData = await conn.query(getQuizCorrectSql, [id]);
    const getQuizAllData = await conn.query(getQuizAllSql, [id]);

    console.log('getQuizCorrectData: ', getQuizCorrectData[0][0]['COUNT(*)']);
    console.log('getQuizAllData: ', getQuizAllData[0][0]["COUNT(*)"]);

    const correctCount = getQuizCorrectData[0][0]["COUNT(*)"];
    const allCount = getQuizAllData[0][0]["COUNT(*)"];


    if (allCount > 0) {
        // const todayPercent = allCount > 0 ? ((correctCount / allCount) * 100) : '0';
        const todayPercent = allCount > 0 ? ((correctCount / allCount) * 100).toFixed(0) : '0';
        // const ratio = (correctCount / allCount) * 100;
        const result = todayPercent+"%";
        const insertTodayPercent = await conn.query(insertTodayPercentSql, [todayPercent, id]);
        conn.release();
        return result;
    } else {
        // 푼 단어 없을 때 0% 반환
        conn.release();
        return '0%';
    }
}

// 사용자 전체 id 조회
export const getAllUserId = async ()=> {
    try {
        const conn = await pool.getConnection();

        const allUserIdData = await conn.query(getAllUserIdsSql);
        console.log('allUserIdData: ', allUserIdData[0]);
        conn.release();
        return allUserIdData[0];
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

// 유저별로 스트릭 퍼센트 갱신
export const updateUserData = async () => {
    const conn = await pool.getConnection();

    const user_ids = await getAllUserId();
    // 각 사용자의 주간 정답률 업데이트
    for (let i = 0; i < user_ids.length; i++) {
        const id = user_ids[i].user_id;
        await updateWeeklyPercent(id);
        await updateWeeklyStreak(id);
    }

    const getAllUserWeekPercent = await conn.query(getAllUserWeekPercentSql);

    conn.release();

    return getAllUserWeekPercent[0];
}

// 주차 퀴즈 정답률 업데이트
// 날짜 바뀔 때만 실행하기
export const updateWeeklyPercent = async (id) => {
    const conn = await pool.getConnection();
    try {
        console.log("userId: ", id);
        // 오늘 정답률 조회
        const todayPercentData = await conn.query(getTodayQuizDataSql, [id]);

        // 오늘의 정답률 계산
        /*
        const correctData = await conn.query(getQuizCorrectSql, [userId]);
        const allData = await conn.query(getQuizAllSql, [userId]);
        const correctCount = correctData[0][0]["COUNT(*)"];
        const allCount = allData[0][0]["COUNT(*)"];
        const todayPercent = allCount > 0 ? ((correctCount / allCount) * 100).toFixed(2) : '0';
        */

        console.log("todayPercent: ", todayPercentData[0][0].today_percent);

        const todayPercent = todayPercentData[0][0].today_percent;
    
        // 현재 weekly_percent 가져오기
        const weeklyData = await conn.query(getWeeklySql, [id]);

        console.log("weeklyData: ", weeklyData);
        
        let weeklyPercent = weeklyData[0][0].weekly_percent ? JSON.parse(weeklyData[0][0].weekly_percent) : [];
        
        // weekly_percent 업데이트
        if (weeklyPercent.length >= 5) {
            weeklyPercent.shift(); // 배열의 첫 번째 정답률 제거
        }
        weeklyPercent.push(`${todayPercent}%`); // 새로운 정답률 추가
    
        // DB에 업데이트
        
        await conn.query(updateWeeklySql, [JSON.stringify(weeklyPercent), id]);

        const currentWeeklyData = await conn.query(getWeeklySql, [id]);

        console.log('currentWeeklyData: ', currentWeeklyData[0][0]);
        return currentWeeklyData[0][0];
    } catch (err) {
        console.error(err);
    } finally {
        conn.release();
    }
}

// 위클리 정답률 조회
export const getWeeklyPercent = async (id) => {
    const conn = await pool.getConnection();
    const currentWeeklyData = await conn.query(getWeeklySql, [id]);

    conn.release();

    console.log("currentWeeklyData: ", currentWeeklyData[0][0]);

    return currentWeeklyData[0][0];
}

// 퀴즈 스트릭 조회
// 오늘 맞춘 단어 있으면 1 반환 및 DB 저장
export const getStreak = async (id) => {
    const conn = await pool.getConnection();
    const getQuizCorrectData = await conn.query(getQuizCorrectSql, [id]);

    console.log('getQuizCorrectData: ', getQuizCorrectData[0][0]['COUNT(*)']);

    let correctCount = getQuizCorrectData[0][0]["COUNT(*)"];

    if (correctCount > 0) {
        correctCount = 1;
    }
    
    await conn.query(updatetodayStreakSql, [correctCount, id]);

    conn.release();

    return correctCount;
}

// 위클리 스트릭 조회
export const getWeeklyStreak = async (id) => {
    const conn = await pool.getConnection();
    const getWeeklyStreakData = await conn.query(getWeeklyStreakSql, [id]);

    console.log('getWeeklyStreakData: ', getWeeklyStreakData[0][0].streak_array);

    const weeklyStreakData = getWeeklyStreakData[0][0].streak_array;

    conn.release();
    return weeklyStreakData;
}

// 위클리 스트릭 업데이트
export const updateWeeklyStreak = async (id) => {
    const conn = await pool.getConnection();
    const getTodayStreakData = await conn.query(getTodayStreakSql, [id]);

    console.log('getTodayStreakData: ', getTodayStreakData[0][0].streak);

    const todayStreak = getTodayStreakData[0][0].streak;

    // 현재 weekly_streak 가져오기
    const weeklyStreakData = await conn.query(getWeeklyStreakSql, [id]);

    console.log("weeklyStreakData: ", weeklyStreakData);
    
    let weeklyStreak = weeklyStreakData[0][0].streak_array ? JSON.parse(weeklyStreakData[0][0].streak_array) : [];

    // weekly_percent 업데이트
    if (weeklyStreak.length >= 5) {
        weeklyStreak.shift(); // 배열의 첫 번째 정답률 제거
    }
    weeklyStreak.push(todayStreak); // 새로운 정답률 추가

    // DB에 업데이트
    
    await conn.query(updateWeeklyStreakSql, [JSON.stringify(weeklyStreak), id]);

    const currentWeeklyStreakData = await conn.query(getWeeklyStreakSql, [id]);
    conn.release();

    console.log('currentWeeklyStreakData: ', currentWeeklyStreakData[0][0]);
    return currentWeeklyStreakData[0][0];
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