import { response } from "../../src/config/response.js";
import { status } from "../../src/config/response.status.js";
import * as LoginDao from "../models/login.dao.js";

export const kakaoIdToUserIdMiddleware = async (req, res, next) => {
    const { kakao_id } = req.body;

    console.log('kakao_id: ', kakao_id);

    if (!kakao_id) {
        return res.status(400).send({ message: 'kakao_id is required' });
    }
    
    try {
        let user = await LoginDao.checkUserId(kakao_id);
        if (user == undefined) {
            // return res.status(404).send({ message: 'User not found' });
            const signupUser = await LoginDao.signUp(kakao_id);
            user = await LoginDao.checkUserId(kakao_id);
        }
        // 요청 객체에 user_id 추가
        req.user_id = user.user_id;
        next(); 
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
}