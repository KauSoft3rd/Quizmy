import { LevelandPercentDTO, levelDTO } from "../dtos/mypage.dto";
import * as mypageDao from "../models/mypage.dao";
import * as loginDao from "../models/login.dao";

// 위클리 퀴즈 정답률 조회
// 유저 아이디로 조회해서 db에 있는 유저의 grade 1 인 개수/유저의 전체단어개수 계산
// 배열 반환
export const getQuiz = async (id) => {
    try {
        const getUserQuizData = await mypageDao.getWeeklyPercent(id);
        console.log("getUserQuizData: ", getUserQuizData);
    
        return getUserQuizData; 
    } catch (error) {
        throw error;
    }
}

// 유저 레벨 조회
// 레벨 조회는 항상 DB에 저장된거로 
export const getLevel = async (id) => {
    try {
        // 레벨 조회
        const userCurrentLevel = await mypageDao.getLevel(id);
        console.log('userCurrentLevel: ', userCurrentLevel);

        // 푼 문제 개수 조회
        const countUserQuizData = await mypageDao.countQuiz(id);
        console.log("countUserQuizData: ", countUserQuizData);

        // 레벨 퍼센트
        console.log("LevelandPercentDTO(countUserQuizData, userCurrentLevel): ", LevelandPercentDTO(countUserQuizData, userCurrentLevel));

        return LevelandPercentDTO(countUserQuizData, userCurrentLevel);
    } catch (error) { 
        throw error;
    }
}

// 레벨 증가하는지 체크
// 퀴즈 풀 때마다 체크
// 50, 150, 350, 750, 1550
export const checkLevel = async (id) => {
    try {
        // 푼 문제 개수 조회
        const countUserQuizData = await mypageDao.countQuiz(id);

        let userNewLevel
        if ( countUserQuizData < 50 ) userNewLevel = 1;
        else if ( countUserQuizData < 150 ) userNewLevel = 2;
        else if ( countUserQuizData < 350 ) userNewLevel = 3;
        else if ( countUserQuizData < 750 ) userNewLevel = 4;
        else if ( countUserQuizData < 1550 ) userNewLevel = 5;
        else userNewLevel = 6;

        const userCurrentLevel = await mypageDao.getLevel(id);

        if(userNewLevel != userCurrentLevel) {
            const patchLevelData = await mypageDao.patchLevel(id, userNewLevel);
            console.log("change level: ", patchLevelData);
            return patchLevelData;
        }
        else {
            console.log("not change level: ", userCurrentLevel);
            return userCurrentLevel;
        }
    } catch (error) {
        throw error;
    }
}

// 퀴즈 개수 증가 - 맞은 문제만
export const addCountQuiz = async (id) => {
    try {
        // 개수 증가
        const addCountQuizData = await mypageDao.addCountQuiz(id);
        console.log('addCountQuizData: ', addCountQuizData);

        // 레벨 조회
        const currentLevelData = await checkLevel(id);

        const userInfoData = await loginDao.getUserspec(id);

        return userInfoData;
    } catch (error) { 
        console.log(error);
        throw error;
    }
}

// 퀴즈 포인트 적제
export const addQuizPoint = async (id, words_id) => {
    try {
        // 사용자 레벨 조회
        const userlevel = await mypageDao.getLevel(id);
        console.log('userlevel: ', userlevel);

        // 퀴즈 레벨 조회
        const quizlevel = await mypageDao.getQuizLevel(words_id);
        console.log('quizlevel: ', quizlevel);
    
        // 퀴즈 레벨이랑 비교
        // 퀴즈 레벨 - 사용자 레벨

        const diff = quizlevel - userlevel;
        let point
        if (diff == 0) point = 15;
        else if (diff == 1) point = 20;
        else if (diff == 2) point = 25;
        else if (diff == -1) point = 10;
        else if (diff == -2) point = 5;

        console.log('point: ', point);

        // 오늘 포인트 조회해서 더한게 300보다 커지면 300으로 넘김 -> todaypoint
        const usertodaypointData = await mypageDao.getTodayPoint(id);
        const userpointData = await mypageDao.getPoint(id);

        console.log('usertodaypointData: ', usertodaypointData);
        console.log('userpointData: ', userpointData);

        let usernewtodaypoint = usertodaypointData + point;
        let usernewpoint = userpointData + point;
        
        if (usertodaypointData == 300) {
            return {userlevel, quizlevel, usertodaypointData, userpointData}
        }
        else if (usernewtodaypoint > 300) { 
            usernewtodaypoint = 300;
            usernewpoint = userpointData + (300 - usertodaypointData);
        }

        const addtodaypoint = await mypageDao.addQuizTodayPoint(id, usernewtodaypoint);
        const addpoint = await mypageDao.addQuizPoint(id, usernewpoint);

        console.log('addtodaypoint: ', addtodaypoint);
        console.log('addpoint: ', addpoint);

        return {userlevel, quizlevel, addtodaypoint, addpoint};
    } catch (error) { 
        console.log(error);
        throw error;
    }
}