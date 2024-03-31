import { response } from '../config/response';
import { status } from '../config/response.status';
import { getUserQuizbookLevel, getWordsInfoDao, getTodayRemindDao } from '../models/remind.dao';


/*
API 1 : 
반환결과 : [ 단어 : 뜻 ]
*/

export const getRemindWordsList = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const [wordList] = await getUserQuizbookLevel(user_id);
        return res.send(response(status.SUCCESS, wordList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}


/*
API 2 : 누적 단어를 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getRemindTotal = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const wordsList = await getWordsInfoDao(user_id);
        console.log(wordsList);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 3 : 오늘 단어를 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getRemindToday = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const wordsList = await getTodayRemindDao(user_id);
        console.log(wordsList);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}