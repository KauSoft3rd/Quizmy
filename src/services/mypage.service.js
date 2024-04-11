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
export const getStreak = async (req, res) => {

}

// 유저 레벨 조회
export const getLevel = async (req, res) => {

}