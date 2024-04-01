import { pool } from "../config/db.config";
import { getUserWorkbookLevel, getWordsUnderUserLevel } from "./remind.sql";

// 사용자가 안풀었던 퀴즈 중 랜덤으로 제공
export const getRandomWordDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [quizbookLevel] = await db.query(getUserWorkbookLevel, [user_id]);
        const [wordsList] = await db.query(getWordsUnderUserLevel, quizbookLevel[0].quizbook); // 사용자의 퀴즈레벨 이하의 모든 퀴즈들을 조회
        // 해당 퀴즈 중 풀지 않은 리스트만 추려내기

        // 그 중 랜덤으로 하나 뽑아내기

        db.release();
        return wordsList;
    } catch ( error ) {
        return error;
    }
}