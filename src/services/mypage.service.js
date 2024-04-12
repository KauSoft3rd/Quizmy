import { levelDTO } from "../dtos/mypage.dto";
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
export const getLevel = async (id) => {
    try {
        // 포인트 조회
        const userPointData = await mypageDao.getLevel(id);
        console.log("getUserLevelData: ", userPointData);

        // 레벨로 치환
        // 100p(bronze), 300p(sliver), 700p(gold) 
        // 1500p(platinum), 3100(diamond), 6300p(ruby)
        let userLevelData;

        if ( userPointData < 100 ) userLevelData = 'Bronze';
        else if ( userPointData < 300 ) userLevelData = 'Silver';
        else if ( userPointData < 700 ) userLevelData = 'Gold';
        else if ( userPointData < 1500 ) userLevelData = 'Platinum';
        else if ( userPointData < 3100 ) userLevelData = 'Diamond'
        else userLevelData = 'Ruby';

        // 레벨 퍼센트
        let userPercentData

        if ( userLevelData == 'Bronze' ) userPercentData = (userPointData/100)*100+"%";
        else if ( userLevelData == 'Silver' ) userPercentData = ((userPointData-100)/200)*100+"%";
        else if ( userLevelData == 'Gold' ) userPercentData = ((userPointData-200)/400)*100+"%";
        else if ( userLevelData == 'Platinum' ) userPercentData = ((userPointData-400)/800)*100+"%";
        else if ( userLevelData == 'Diamond' ) userPercentData = ((userPointData-800)/1600)*100+"%";
        else if ( userLevelData == 'Ruby' ) userPercentData = ((userPointData-1600)/3200)*100+"%";

        console.log("levelDTO(userPointData, userLevelData, userPercentData): ", levelDTO(userPointData, userLevelData, userPercentData));

        return levelDTO(userPointData, userLevelData, userPercentData);
    } catch (error) {
        throw error;
    }
}