import { LevelandPercentDTO, levelDTO } from "../dtos/mypage.dto";
import * as mypageDao from "../models/mypage.dao";
import * as loginDao from "../models/login.dao";

// 퀴즈 정답률 조회
// 유저 아이디로 조회해서 db에 있는 유저의 grade 1 인 개수/유저의 전체단어개수 계산
export const getQuiz = async (id) => {
    try {
        const getUserQuizData = await mypageDao.getQuiz(id);
        console.log("getUserQuizData: ", getUserQuizData);
    
        return getUserQuizData; 
    } catch (error) {
        throw error;
    }
}

// 퀴즈 스트릭 조회
// 오늘 풀었는지(틀려도 무관)
export const getStreak = async (id) => {
    try {
        const getUserStreakData = await mypageDao.getStreak(id);
        console.log("getUserStreakData: ", getUserStreakData);

        if (getUserStreakData > 0) {
            getUserStreakData = 1;
        }
    
        return getUserStreakData; 
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
        if ( countUserQuizData < 50 ) userNewLevel = 'Bronze';
        else if ( countUserQuizData < 150 ) userNewLevel = 'Silver';
        else if ( countUserQuizData < 350 ) userNewLevel = 'Gold';
        else if ( countUserQuizData < 750 ) userNewLevel = 'Platinum';
        else if ( countUserQuizData < 1550 ) userNewLevel = 'Diamond';
        else userNewLevel = 'Ruby';

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
        throw error;
    }
}
