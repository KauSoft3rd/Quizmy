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
        console.log(wordsList);
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

// 오늘 시도한 단어를 최신순으로 조회
import { getTodayNewestRemindDao } from '../models/remind.dao';
export const getTodayNewestRemind = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getTodayNewestRemindDao(user_id);
        console.log(wordsList);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}

// 누적 시도한 단어를 최신순으로 조회
import { getAccNewestRemindDao } from '../models/remind.dao';
export const getAccNewestRemind = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getAccNewestRemindDao(user_id);
        console.log(wordsList);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}

// 오늘 단어중 정답만 조회
import { getTodayCorrectRemindListDao } from '../models/remind.dao';
export const getTodayCorrectRemind = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getTodayCorrectRemindListDao(user_id);
        console.log(wordsList);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}

// 오늘 단어중 오답만 조회
import { getTodayIncorrectRemindListDao } from '../models/remind.dao';
export const getTodayIncorrectRemind = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getTodayIncorrectRemindListDao(user_id);
        console.log(wordsList);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}

// 누적 단어중 정답만 조회
import { getAccCorrectRemindListDao } from '../models/remind.dao';
export const getAccCorrectRemind = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getAccCorrectRemindListDao(user_id);
        console.log(wordsList);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}

// 누적 단어중 오답만 조회
import { getAccIncorrectRemindListDao } from '../models/remind.dao';
export const getAccIncorrectRemind = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getAccIncorrectRemindListDao(user_id);
        console.log(wordsList);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}

// 오늘 단어중 가나다순 조회
import { getTodayAlphaRemindListDao } from '../models/remind.dao';
export const getTodayAlphaRemind = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getTodayAlphaRemindListDao(user_id);
        wordsList.sort(alphaService);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR))
    }
}

// 누적 단어중 가나다순 조회
import { getAccAlphaRemindListDao } from '../models/remind.dao';
export const getAccAlphaRemind = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        const wordsList = await getAccAlphaRemindListDao(user_id);
        wordsList.sort(alphaService);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}


import { updateWordsLevelDao } from '../models/remind.dao';
export const updateWordsLevel = async (req, res, next) => {
    try {
        const user_id = req.user_id;
        updateWordsLevelDao();

    } catch ( error ) {
        console.log(error);
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}