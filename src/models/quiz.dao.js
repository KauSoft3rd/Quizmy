import { pool } from "../config/db.config";
import { getUserWorkbookLevelSql } from "./remind.sql";
import { getUserRemindWordsIdSql, getQuizWordsIdSql, getRandomQuizSql, updateRemindGradeSql } from "./quiz.sql";
import { randomSelectService } from "../services/quiz.service";

// 사용자가 안풀었던 퀴즈 중 랜덤으로 제공
export const getRandomWordDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [quizbookLevel] = await db.query(getUserWorkbookLevelSql, [user_id]);
        // wordsList == 사용자 퀴즈북 레벨보다 같거나 낮은 단어 id 리스트
        const [wordsidList] = await db.query(getQuizWordsIdSql, quizbookLevel[0].quizbook); // 사용자의 퀴즈레벨 이하의 모든 퀴즈들을 조회
        //  correctList == 사용자가 맞춘 단어 리스트
        const [correctList] = await db.query(getUserRemindWordsIdSql, [user_id]);
        
        const resultWordsIdList = wordsidList.filter(word => 
            !correctList.some(correct => correct.words_id === word.words_id));

        const result = resultWordsIdList.map(word => word.words_id);

        // 그 중 랜덤으로 하나 뽑아내기
        const quizWordsId = randomSelectService(result);
        const [quiz] = await db.query(getRandomQuizSql, quizWordsId);

        db.release();
        return quiz;
    } catch ( error ) {
        return error;
    }
}

// 사용자 퀴즈를 시도한 결과에 따른 Remind Patch
export const patchRemindWordDao = async (user_id, words_id, grade) => {
    try {
        const db = await pool.getConnection();
        await db.query(updateRemindGradeSql, [user_id, words_id, grade]);
        db.release();
        return;
    } catch ( error ) {
        return error;
    }
}