import { response } from "../config/response.js";
import { status } from "../config/response.status.js";
import * as LoginService from '../services/login.service.js';

// 로그인
// 아이디 조회해서 userinfo에 있는지 확인
// 없으면 0 반환 있으면 1 반환
// 0이면 레벨테스트 진행해야함
// id = 카톡 일련번호
export const kakaoLogin = async (req, res) => {
    try {
        console.log("로그인");
        const user_id = req.user_id;
        console.log("user_id: ", user_id);

        return res.send(response(status.SUCCESS, await LoginService.signInQuizmy(user_id)));
    } catch (error) {
        console.log('error: ', error);
        return res.send(response(status.BAD_REQUEST));
    }
};    

// 사용자 정보 조회
export const getUserInfo = async (req, res) => {
    try {
        console.log("사용자 정보 조회");  
        const user_id = req.user_id;
        console.log('user_id: ', user_id);

        return res.send(response(status.SUCCESS, await LoginService.getUserInfo(user_id)));
    } catch (error) {
      return res.send(response(status.BAD_REQUEST));
    }
};    

// 레벨테스트
export const levelTest = async (req, res)=>{
    console.log("level test");
    console.log("body:", req.body);

    const user_id = req.user_id;

    return res.send(response(status.SUCCESS, await LoginService.levelTest(user_id, req.body.point)));
}