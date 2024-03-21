import axios from 'axios';

// 토큰 받기
export const getKakaoAccessToken = async (reqcode) => {
    const baseUrl = "https://kauth.kakao.com/oauth/token";
    const config = {
      client_id: process.env.KAKAO_ID,
      client_secret: process.env.KAKAO_SECRET,
      grant_type: "authorization_code",
      redirect_uri: process.env.REDIRECT_URL,
      code: reqcode
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const kakaoTokenRequest = await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json", // 이 부분을 명시하지않으면 text로 응답을 받게됨
      },
    });
    const json = await kakaoTokenRequest.json();
    console.log(json);
    return JSON.stringify(json); // 프론트엔드에서 확인용
};

// 유저 정보 받기
export const getUserInfo = async (accessToken) => {
    try {
      const url = 'https://kapi.kakao.com/v2/user/me';
      const headers = {
        Authorization: `Bearer ${accessToken}`, // Bearer 토큰으로 인증
      };
      const response = await axios.get(url, { headers });
      console.log("response: ", response.data);

      // console.log("dto: ", getUserDto(response.data))
      return response.data; 
    } catch (error) {
      throw new Error('Failed to retrieve user information from Kakao API');
    }
};

// 로그아웃
export const logoutFromKakao = async (accessToken) => {
    try {
        const response = await axios.post('https://kapi.kakao.com/v1/user/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Logout Error:", error);
        throw error;
    }
};