import { response } from '../config/response';
import { status } from '../config/response.status';
import { getRemindWordsList } from '../controllers/remind.controller';
/*
MIDDLE WARE 1 : 단어 되돌아보기에서 옵션에 해당하는 라우팅
요청형식 : { 오늘의 퀴즈 / 누적 단어, 정렬기준 } 
반환결과 : [ 단어, 뜻, 정답/오답 ]
*/

export const getRemindQuizMiddleware = async (req, res, next) => {
    try {
        // const { backOption, sortOption } = req.body();

        getRemindWordsList(req, res, next);

        /*
        if (backOption === "today") {
            if (sortOption === "Newest") {

            }
            else if (sortOption === "alpha") {

            }
            else if (sortOption === "correct") {

            }
            else if (sortOption === "incorrect") {

            }
            else return res.send(response(status.BAD_REQUEST, "올바른 정렬 옵션이 아닙니다."));
        }
        else if (backOption === "accumulate") {
            if (sortOption === "Newest") {

            }
            else if (sortOption === "alpha") {

            }
            else if (sortOption === "correct") {

            }
            else if (sortOption === "incorrect") {

            }
            else return res.send(response(status.BAD_REQUEST, "올바른 정렬 옵션이 아닙니다."));
        } else {
            return res.send(response(status.BAD_REQUEST, "요청 옵션이 정확하지 않습니다."));
        }
        */
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}