import { response } from '../config/response';
import { status } from '../config/response.status';
import { getRandomWordDao } from '../models/quiz.dao';

/*
API 1 : 오늘 풀어볼 단어를 조회
반환결과 : [ 단어 : 뜻 ]
*/

export const getQuizWord = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const wordsList = await getRandomWordDao(user_id);
        return res.send(response(status.SUCCESS, wordsList));
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}