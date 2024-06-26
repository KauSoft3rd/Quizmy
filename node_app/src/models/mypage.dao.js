import { pool } from "../config/db.config.js"; //db
import { addCountQuizSql, addPointSql, addTodayPointSql, countUserQuizSql, getAllUserIdsSql, getAllUserWeekPercentSql, getQuizAllSql, getQuizCorrectSql, getQuizLevelSql, getTicketSql, getTodayQuizDataSql, getTodayStreakSql, getUserLevelSql, getUserPointSql, getUserTodayPointSql, getWeeklySql, getWeeklyStreakSql, getticketColorSql, insertTodayPercentSql, resetTicketSql, resetTodayPointSql, resetTodaySql, updateUserPointSql, updateWeeklySql, updateWeeklyStreakSql, updatetodayStreakSql } from "./mypage.sql.js";

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
        const todayPercent = allCount > 0 ? Math.round((correctCount / allCount) * 100) : 0;
        // const ratio = (correctCount / allCount) * 100;
        const result = todayPercent;
        const insertTodayPercent = await conn.query(insertTodayPercentSql, [todayPercent, id]);
        conn.release();
        return result;
    } else {
        // 푼 단어 없을 때 0% 반환
        const insertTodayPercent = await conn.query(insertTodayPercentSql, [0, id]);

        conn.release();

        return 0;
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
        await resetTodayData(id);
        await resetTicketData(id);
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

        console.log("todayPercent: ", todayPercentData[0][0].today_percent);

        const todayPercent = todayPercentData[0][0].today_percent;
    
        // 현재 weekly_percent 가져오기
        const weeklyData = await conn.query(getWeeklySql, [id]);

        console.log("weeklyData: ", weeklyData[0][0].weekly_percent);
        
        let weeklyPercent = weeklyData[0][0].weekly_percent ? JSON.parse(weeklyData[0][0].weekly_percent) : [];
        
        // weekly_percent 업데이트
        if (weeklyPercent.length >= 5) {
            weeklyPercent.shift(); // 배열의 첫 번째 정답률 제거
        }
        weeklyPercent.push(todayPercent); // 새로운 정답률 추가
    
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

    const weeklyData = JSON.parse(currentWeeklyData[0][0].weekly_percent);

    console.log("weeklyData: ", weeklyData);

    return weeklyData;
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

    const weeklystreakData = JSON.parse(getWeeklyStreakData[0][0].streak_array);

    console.log("weeklyData: ", weeklystreakData);

    conn.release();
    return weeklystreakData;
}

// 위클리 스트릭 업데이트
export const updateWeeklyStreak = async (id) => {
    const conn = await pool.getConnection();
    const getTodayStreakData = await conn.query(getTodayStreakSql, [id]);

    console.log('getTodayStreakData: ', getTodayStreakData[0][0].streak);

    const todayStreak = getTodayStreakData[0][0].streak;

    // 현재 weekly_streak 가져오기
    const weeklyStreakData = await conn.query(getWeeklyStreakSql, [id]);

    console.log("weeklyStreakData: ", weeklyStreakData[0][0].streak_array);
    
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

    const weeklystreakData = JSON.parse(currentWeeklyStreakData[0][0].streak_array);

    console.log("weeklyData: ", weeklystreakData);

    return weeklystreakData;
}

// 유저 레벨 조회
// 포인트 조회 -> 레벨로 치환
export const getLevel = async (id) => {
    const conn = await pool.getConnection();
    
    // 푼 문제 개수 확인
    const countUserQuizData = await conn.query(countUserQuizSql, [id]);


    const getUserLevelData = await conn.query(getUserLevelSql, [id]);

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

    conn.release();
    return getUserPointData[0][0].point;
}

// 오늘 포인트 조회
export const getTodayPoint = async(id) => {
    const conn = await pool.getConnection();
    const getUserTodayPointData = await conn.query(getUserTodayPointSql, [id]);

    conn.release();
    return getUserTodayPointData[0][0].todaypoint;
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

// 전체 포인트 적재
export const addQuizPoint = async (id, point) => {
    const conn = await pool.getConnection();
    
    await conn.query(addPointSql, [point, id]);
    const userPointData = await conn.query(getUserPointSql, [id]);

    conn.release();
    
    return userPointData[0][0].point;
}

// 오늘 포인트 적재
export const addQuizTodayPoint = async (id, point) => {
    const conn = await pool.getConnection();
    
    await conn.query(addTodayPointSql, [point, id]);
    const userTodayPointData = await conn.query(getUserTodayPointSql, [id]);

    conn.release();
    
    return userTodayPointData[0][0].todaypoint;
}

// 오늘 userinfo 데이터 초기화
export const resetTodayData = async (id) => {
    const conn = await pool.getConnection();
    
    await conn.query(resetTodaySql, [id]);
    const userTodayData = await conn.query(getAllUserWeekPercentSql, [id]);
    console.log("userTodayPointData: ", userTodayData[0][0]);

    conn.release();
    
    return userTodayData[0][0];
}

// 단어 레벨 조회
export const getQuizLevel = async (id) => {
    const conn = await pool.getConnection();
    
    await conn.query(resetTodaySql, [id]);
    const quizlevel = await conn.query(getQuizLevelSql, [id]);

    conn.release();
    
    return quizlevel[0][0].level;
}

// 티켓 개수 초기화
export const resetTicketData = async (id) => {
    const conn = await pool.getConnection();
    
    await conn.query(resetTicketSql, [id]);
    const ticketdata = await conn.query(getTicketSql, [id]);
    console.log("ticketdata[0][0].ticket: ", ticketdata[0][0].ticket);

    conn.release();
    
    return ticketdata[0][0].ticket;
}

// 컬러칩 조회
export const ticketColor = async (id) => {
    try{
        const conn = await pool.getConnection();
    
        const colorData = await conn.query(getticketColorSql, [id]);

        let color;

        if(colorData[0][0].color == 0) {
            const getLevelData = await conn.query(getUserLevelSql, [id]);
            color = getLevelData[0][0].level;
        }
        else color = colorData[0][0].color;

        conn.release();

        console.log('color: ', color);

        return color;
    } catch(error){
        console.log(error);
        return error;
    }
}