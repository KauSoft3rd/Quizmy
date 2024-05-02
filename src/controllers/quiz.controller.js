import { response } from '../config/response';
import { status } from '../config/response.status';
import { getRandomWordDao, patchRemindWordDao, getTodayWordsDao, getAccWordsDao, getCorrectWordsDao, getIncorrectWordsDao } from '../models/quiz.dao';

/*
API 1 : 오늘 풀어볼 단어를 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getQuizWord = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const quizWord = await getRandomWordDao(user_id);
        console.log(quizWord);
        return res.send(response(status.SUCCESS, quizWord));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 2 : 단어를 정답/오답 반영
반환결과 : [ 단어 : 뜻 ]
*/

export const patchRemindWord = async (req, res, next) => {
    try {
        const { user_id, words_id, grade } = req.body;
        let msg;
        if (grade) msg = "정답입니다.";
        else msg = "오답입니다.";
        
        await patchRemindWordDao(user_id, words_id, grade);

        return res.send(response(status.SUCCESS, msg));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 3 : 오늘 풀었던 단어들 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getTodayWords = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        const wordList = await getTodayWordsDao(user_id);
        return res.send(response(status.SUCCESS, wordList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 4 : 누적해서 단어들 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getAccWords = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const wordList = await getAccWordsDao(user_id);
        return res.send(response(status.SUCCESS, wordList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 5 : 사용자의 정답 단어들 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getCorrectWords = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const wordList = await getCorrectWordsDao(user_id);
        return res.send(response(status.SUCCESS, wordList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 6 : 사용자의 오답 단어들 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getIncorrectWords = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const wordList = await getIncorrectWordsDao(user_id);
        return res.send(response(status.SUCCESS, wordList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}