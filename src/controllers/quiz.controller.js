import { response } from '../config/response';
import { status } from '../config/response.status';
import { getRandomWordDao, patchRemindWordDao } from '../models/quiz.dao';

/*
API 1 : 오늘 풀어볼 단어를 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getQuizWord = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const quizWord = await getRandomWordDao(user_id);
        return res.send(response(status.SUCCESS, quizWord));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
API 2 : 오늘 풀어볼 단어를 조회
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