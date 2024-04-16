import { LevelandPercentDTO, levelDTO } from "../dtos/mypage.dto";
import * as mypageDao from "../models/mypage.dao"

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
// 오늘 풀었는지
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
        console.log("countUserQuizData: ", countUserQuizData);

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

// 레벨 증가
/*
export const plusLevel = async (id) => {
    try {
        // 현재 포인트 조회
        const currentPointData = await mypageDao.getPoint(id);

        // 포인트를 레벨로 치환 -> pointtoLevel
        let pointtoLevel
        if ( currentPointData < 100 ) pointtoLevel = 1;
        else if ( currentPointData < 300 ) pointtoLevel = 2;
        else if ( currentPointData < 700 ) pointtoLevel = 3;
        else if ( currentPointData < 1500 ) pointtoLevel = 4;
        else if ( currentPointData < 3100 ) pointtoLevel = 5;
        else pointtoLevel = 6;

        // 현재 레벨 조회 -> userLevelData
        const userLevelData = await mypageDao.getLevel(id);

        // pointtoLevel > getLevel => pointtoLevel 값으로 DB 저장값 수정
        if ( pointtoLevel > userLevelData ) {
            const patchLevelData = await mypageDao.patchLevel(id, pointtoLevel);
            console.log("change level: ", patchLevelData);
            return patchLevelData;
        }
        else {
            console.log("not chage level: ", userLevelData);
            return userLevelData;
        }
    } catch (error) {
        throw error;
    }
}
*/