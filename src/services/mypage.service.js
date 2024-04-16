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
export const getStreak = async (id) => {
    try {
        const getUserStreakData = await mypageDao.getStreak(id);
        console.log("getUserStreakData: ", getUserStreakData);
    
        return getUserStreakData; 
    } catch (error) {
        throw error;
    }
}

// 유저 레벨 조회
// 레벨을 1~6으로 저장
// 포인트 증가했을 때 if 문 
// 포인트가 증가했을 때만 DB에 level 수정 -> 함수로 만들기
// 레벨 조회는 항상 DB에 저장된거로 

export const getLevel = async (id) => {
    try {
        // 포인트 조회
        const userLevelData = await mypageDao.getLevel(id);
        console.log("getUserLevelData: ", userLevelData);

        const userPointData = await mypageDao.getPoint(id);
        console.log('userPointData: ', userPointData);

        console.log("levelDTO(userPointData, userLevelData, userPercentData): ", LevelandPercentDTO(userPointData, userLevelData));

        return LevelandPercentDTO(userPointData, userLevelData);
    } catch (error) {
        throw error;
    }
}

// 레벨 증가
// 100p(bronze) -> 1, 300p(sliver) -> 2, 700p(gold) -> 3 
// 1500p(platinum) -> 4, 3100(diamond) -> 5, 6300p(ruby) -> 6
// point = 증가한 포인트
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