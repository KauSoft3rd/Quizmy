import { response } from '../config/response';
import { status } from '../config/response.status';
import { getUserQuizbookLevelDao, getWordsInfoDao, getTodayRemindDao, getNewestRemindDao } from '../models/remind.dao';
import { alphaService } from '../services/remind.service';

/*
API 1 : 
반환결과 : [ 단어 : 뜻 ]
*/

export const getRemindWordsList = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const [wordList] = await getUserQuizbookLevelDao(user_id);
        return res.send(response(status.SUCCESS, wordList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}

/*
API 2 : 누적 단어를 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getRemindTotal = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getWordsInfoDao(user_id);
        console.log(wordsList);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}

/*
API 3 : 오늘 단어를 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getRemindToday = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getTodayRemindDao(user_id);
        console.log(wordsList);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}

/*
API 4 : 오늘 단어를 최신순 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getRemindNewest = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getNewestRemindDao(user_id);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}

/*
API 5 : 오늘 단어를 오름차순으로 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getRemindAlpha = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getWordsInfoDao(user_id);
        wordsList.sort(alphaService);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}