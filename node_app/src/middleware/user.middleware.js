import { response } from "../config/response.js";
import { status } from "../config/response.status.js";
import * as LoginDao from "../models/login.dao.js";

export const kakaoIdToUserIdMiddleware = async (req, res, next) => {
    const { kakao_id } = req.query;

    console.log('kakao_id: ', kakao_id);

    if (!kakao_id) {
        return res.status(400).send({ message: 'kakao_id is required' });
    }

    // 변환 함수
    const transformKakaoId = (id) => {
        return id.replace(/\+/g, 'A').replace(/\//g, 'B').replace(/=/g, 'C');
    };

    const transformedKakaoId = transformKakaoId(kakao_id);

    console.log("변환 kakao_id: ", transformedKakaoId);

    try {
        let user = await LoginDao.checkUserId(transformedKakaoId);
        if (user == undefined) {
            // return res.status(404).send({ message: 'User not found' });
            const signupUser = await LoginDao.signUp(transformedKakaoId);
            user = await LoginDao.checkUserId(transformedKakaoId);
        }
        // 요청 객체에 user_id 추가
        req.user_id = user.user_id;
        next();
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}