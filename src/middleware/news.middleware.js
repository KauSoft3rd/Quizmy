import { response } from '../config/response';
import { status } from '../config/response.status';
import { getBookmarkNewsDB } from '../models/news.dao';

/*
MIDDLE WARE 1 : 해당 뉴스가 북마크에 존재하는 뉴스인지 확인하는 미들웨어
요청형식 : 사용자 id, 기사url (string)
반환결과 : 
*/

export const postBookmarkMiddleware = async (req, res, next) => {
    try {
        const { user_id, link } = req.body;
        const bookmarkList = await getBookmarkNewsDB(user_id);
        
        if (bookmarkList.some(item => item.link === link)) {
            return res.send(response(status.BAD_REQUEST, "이미 북마크되어 있는 뉴스기사 입니다."))
        }
        else next();
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}

/*
MIDDLE WARE 2 : 해당 뉴스가 북마크에 존재하는 뉴스인지 확인하는 미들웨어
요청형식 : 사용자 id, 기사url (string)
반환결과 : 
*/

export const deleteBookmarkMiddleware = async (req, res, next) => {
    try {
        const { user_id, link } = req.body;
        const bookmarkList = await getBookmarkNewsDB(user_id);
        if (!bookmarkList.some(item => item.link === link)) {
            return res.send(response(status.BAD_REQUEST, "이미 북마크에서 삭제된 뉴스입니다."))
        }
        else next();
    } catch ( error ) {
        return res.send(response(status.INTERNAL_SERVER_ERROR));
    }
}