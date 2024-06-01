import { response } from '../config/response';
import { status } from '../config/response.status';

/*
MIDDLE WARE 1 : 단어 되돌아보기에서 옵션에 해당하는 라우팅
요청형식 : { 오늘의 퀴즈 / 누적 단어, 정렬기준 } 
반환결과 : [ 단어, 뜻, 정답/오답 ]
*/

import { getAccNewestRemind, getTodayNewestRemind } from '../controllers/remind.controller';
import { getAccCorrectRemind, getTodayCorrectRemind } from '../controllers/remind.controller';
import { getAccIncorrectRemind, getTodayIncorrectRemind } from '../controllers/remind.controller';
import { getAccAlphaRemind, getTodayAlphaRemind } from '../controllers/remind.controller';
export const remindMiddleware = async (req, res, next) => {
    try {
        const { dayParam, sortParam } = req.query;
        if (sortParam === 'newest') {
            if (dayParam === 'today') await getTodayNewestRemind(req, res, next);
            else if (dayParam === 'acc') await getAccNewestRemind(req, res, next);
            else throw error;
        }
        else if (sortParam === 'alpha') {
            if (dayParam === 'today') await getTodayAlphaRemind(req, res, next);
            else if (dayParam === 'acc') return await getAccAlphaRemind(req, res, next); 
            else throw error;
        }
        else if (sortParam === 'correct') {
            if (dayParam === 'today') await getTodayCorrectRemind(req, res, next);
            else if (dayParam === 'acc') await getAccCorrectRemind(req, res, next);
            else throw error;
        }
        else if (sortParam === 'incorrect') {
            if (dayParam === 'today') await getTodayIncorrectRemind(req, res, next);
            else if (dayParam === 'acc') await getAccIncorrectRemind(req, res, next);
            else throw error;
        }
        else throw error;
    } catch ( error ) {
        console.log(error);
        return res.send(response(status.INTERNAL_SERVER_ERROR, error));
    }
}
