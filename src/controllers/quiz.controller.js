import { response } from '../config/response';
import { status } from '../config/response.status';
import axios from 'axios';
import { getRandomWordDao, patchRemindWordDao, getTodayWordsDao, getAccWordsDao, getCorrectWordsDao, getIncorrectWordsDao } from '../models/quiz.dao';
import { addCountQuiz } from '../services/mypage.service';

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
        if (grade) {
            msg = "정답입니다.";
            await addCountQuiz(user_id);
        } 
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

export const reqChatGPT = async (req, res, next) => {
    try {
        const { user_id, prompt } = req.body;
        const model = "gpt-3.5-turbo";

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.CHAT_GPT_KEY}`
        };

        const params = {
            model: model,
            messages: [{ role: "user", content: prompt}],
            temperature: 0.7
        };
        
        const chatResult = await axios.post('https://api.openai.com/v1/chat/completions', params, { headers });

        const result = chatResult.data.choices[0].message.content;

        return res.send(response(status.SUCCESS, result));
    } catch ( error ) {
        console.log(error);
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}