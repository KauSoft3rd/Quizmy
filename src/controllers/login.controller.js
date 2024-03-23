import { response } from "../../src/config/response.js";
import { status } from "../../src/config/response.status.js";
import * as LoginService from '../services/login.service.js';

// 로그인
export const startKakaoLogin = (req, res) => {
    const baseUrl = "https://kauth.kakao.com/oauth/authorize";
    const config = {
      client_id: process.env.KAKAO_ID,
      redirect_uri: process.env.REDIRECT_URL,
      response_type: "code",
    };
    const params = new URLSearchParams(config).toString();
    console.log("login params: ", params);
  
    const finalUrl = `${baseUrl}?${params}`;
    console.log(finalUrl);
    return res.redirect(finalUrl);
};

// 콜백 
export const finishKakaoLogin = async (req, res) => {
    try {
        const code = req.query.code;
        // const tokenData = await LoginService.getKakaoAccessToken(code);
        const { accessToken, profile } = await LoginService.getKakaoAccessTokenAndProfile(code);
      
        const loginResult = await LoginService.userLogin(accessToken, profile);
        
        return res.send(response(status.SUCCESS, accessToken));
    } catch (error) {
        console.error('Error during Kakao login:', error);
        return res.send(response(status.BAD_REQUEST));
    }
};

// 사용자 정보 조회
export const getUserInfo = async (req, res) => {
    try {
        console.log(req.headers);
        const accessToken = req.headers.authorization; // 헤더에서 액세스 토큰을 받아옵니다.
        console.log("getUserInfoService(accessToken): ", LoginService.getUserInfo(accessToken));
        return res.send(response(status.SUCCESS, await LoginService.getUserInfo(accessToken)));
    } catch (error) {
      return res.send(response(status.BAD_REQUEST));
    }
};    

// 로그아웃
export const logoutUser = async (req, res) => {
    try {
      const accessToken = req.headers.authorization; // "Bearer YOUR_ACCESS_TOKEN" 형식으로 전달된 토큰에서 실제 토큰 값만 추출
      const logoutId = await LoginService.logoutFromKakao(accessToken);
      /*axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },*/
      //});

      // db토큰 지우기

      console.log("response.data: ", logoutId);
      return res.send(response(status.SUCCESS, logoutId)); // 로그아웃 유저 일련번호 출력
    } catch (error) {
      console.error('Logout Error:', error);
      return res.send(response(status.BAD_REQUEST));
    }
};

// 레벨테스트
export const levelTest = async (req, res)=>{
    console.log("level test");
    console.log("body:", req.body);
    const accessToken = req.headers.authorization;
    const userinfo = await LoginService.getUserInfo(accessToken);

    // return res.send(response(status.SUCCESS, await LoginService.levelTest(req.body)));
    return res.send(response(status.SUCCESS, await LoginService.levelTest(userinfo.id, req.body.point)));

}