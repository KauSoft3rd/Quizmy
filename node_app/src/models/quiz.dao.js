import { pool } from "../config/db.config";
import { getUserWorkbookLevelSql } from "./remind.sql";
import { getUserRemindWordsIdSql, getQuizWordsIdSql, getRandomQuizSql, getTodayWordsSql, getAccWordsSql, } from "./quiz.sql";
import { getCorrectWordsSql, getIncorrectWordsSql } from "./quiz.sql";
import { randomSelectService } from "../services/quiz.service";

// 사용자가 안풀었던 퀴즈 중 랜덤으로 제공
export const getRandomWordDao = async (user_id) => {
    try {
        const db = await pool.getConnection();
        // 사용자의 퀴즈북 레벨을 조회
        const [quizbookLevel] = await db.query(getUserWorkbookLevelSql, [user_id]);
        // wordsList == 사용자 퀴즈북 레벨보다 같거나 낮은 단어 id 리스트
        const [wordsidList] = await db.query(getQuizWordsIdSql, quizbookLevel[0].quizbook); // 사용자의 퀴즈레벨 이하의 모든 퀴즈들을 조회
        //  correctList == 사용자가 맞춘 단어 리스트
        console.log(wordsidList);
        const [correctList] = await db.query(getUserRemindWordsIdSql, [user_id]); 
        console.log(correctList);

        const resultWordsIdList = wordsidList.filter(word => 
            !correctList.some(correct => correct.words_id === word.words_id));

        const result = resultWordsIdList.map(word => word.words_id);
        console.log(result);
        // 그 중 랜덤으로 하나 뽑아내기
        const quizWordsId = randomSelectService(result);
        const [quiz] = await db.query(getRandomQuizSql, quizWordsId);
        console.log(quiz);
        db.release();
        return quiz;
    } catch ( error ) {
        return error;
    }
}

// 사용자 퀴즈를 시도한 결과에 따른 Remind Patch
// 사용자가 새롭게 문제를 풀 경우 -> insert
// 사용자가 풀었던 문제를 푼 경우 -> update
import { getUserRemindListSql, updateWordGrade, insertWordGrade } from './quiz.sql';
export const patchRemindWordDao = async (user_id, word_id, grade) => {
    try {
        const db = await pool.getConnection();
        const [userWordList] = await db.query(getUserRemindListSql, [user_id, word_id]); // 사용자가 해당단어 시도 기록을 조회
        console.log(userWordList);
        if (userWordList.length === 0) { 
            console.log("최초시도");
            await db.query(insertWordGrade, [user_id, word_id, grade])
        }
        else {
            console.log("재시도");
            await db.query(updateWordGrade, [grade, user_id, word_id]);
        }
        db.release();
        return;
    } catch ( error ) {
        return error;
    }
}

// 사용자가 오늘 시도한 퀴즈의 단어들을 조회
export const getTodayWordsDao = async (user_id) => {
    try {
        const db = await pool.getConnection();

        const [todayWordsId] = await db.query(getTodayWordsSql, [user_id]);
        const result = [];
        for (let i = 0 ;i < todayWordsId.length; i++) {
            const [wordInfo] = await db.query(getRandomQuizSql, todayWordsId[i].words_id);
            wordInfo['grade'] = todayWordsId[i].grade;
            result.push(wordInfo);
        }
        console.log(result);
        db.release();
        return result;
    } catch ( error ) {
        return error;
    }
}

// 사용자가 시도한 모든 단어들을 조회
export const getAccWordsDao = async (user_id) => {
    try {
        const db = await pool.getConnection();

        const [accWordsId] = await db.query(getAccWordsSql, [user_id]);
        const result = [];

        for (let i = 0; i < accWordsId.length; i++) {
            const [wordInfo] = await db.query(getRandomQuizSql, accWordsId[i].words_id);
            result.push(wordInfo);
        }
        console.log(result);
        db.release();
        return result;
    } catch ( error ) {
        return error;
    }
}

// 사용자가 정답을 맞춘 단어들을 조회
export const getCorrectWordsDao = async (user_id) => {
    try {
        const db = await pool.getConnection();

        const [correctWordsId] = await db.query(getCorrectWordsSql, [user_id]);
        const result = [];
        for (let i = 0; i < correctWordsId.length; i++) {
            const [wordInfo] = await db.query(getRandomQuizSql, correctWordsId[i].words_id);
            result.push(wordInfo);
        }
        db.release();
        return result;
    } catch ( error ) {
        return error;
    }
}

// 사용자가 오답을 맞춘 단어들을 조회
export const getIncorrectWordsDao = async (user_id) => {
    try {
        const db = await pool.getConnection();

        const [incorrectWordsId] = await db.query(getIncorrectWordsSql, [user_id]);
        const result = [];

        for (let i = 0; i < incorrectWordsId.length; i++) {
            const [wordInfo] = await db.query(getRandomQuizSql, incorrectWordsId[i].words_id);
            result.push(wordInfo);
        }
        db.release();
        return result;
    } catch ( error ) {
        return error;
    }
}