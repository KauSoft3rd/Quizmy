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
        const { KAKAO_ID, KAKAO_SECRET, REDIRECT_URL } = process.env;
        console.log("KAKAO_ID, KAKAO_SECRET, REDIRECT_URL", KAKAO_ID, KAKAO_SECRET, REDIRECT_URL);
        const code = req.query.code;
        const tokenData = await LoginService.getKakaoAccessToken(req.query.code);

        res.send(tokenData);
    } catch (error) {
        console.error('Error during Kakao login:', error);
        res.status(error.response?.status || 500).json({ message: error.message });
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
        return res.status(500).json({ message: error.message });
    }
};    

// 로그아웃
export const logoutUser = async (req, res) => {
    try {
      const accessToken = req.headers.authorization; // "Bearer YOUR_ACCESS_TOKEN" 형식으로 전달된 토큰에서 실제 토큰 값만 추출
      const response = await LoginService.logoutFromKakao(accessToken);
      /*axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },*/
      //});

      console.log("response.data: ", response);
      return res.status(200).json({ message: 'Successfully logged out', data: response });
    } catch (error) {
      console.error('Logout Error:', error);
      return res.status(error.response?.status || 500).json({ message: error.message });
    }
};

// 레벨테스트
export const postLevel = (req, res)=>{

}