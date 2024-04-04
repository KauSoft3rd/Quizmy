import axios from 'axios';
import jwt from 'jsonwebtoken';
import * as LoginDao from '../models/login.dao.js';

// 토큰 받기
/*
export const getKakaoAccessTokenAndProfile = async (code) => {
  try {
      // 카카오에서 액세스 토큰 가져오기
      const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
          params: {
              grant_type: 'authorization_code',
              client_id: process.env.KAKAO_ID,
              redirect_uri: process.env.REDIRECT_URL,
              code: code,
          },
      });

      const accessToken = tokenResponse.data.access_token;

      console.log('accessToken: ', accessToken);

      // 액세스 토큰을 사용하여 사용자 프로필 가져오기
      const profile = await getUserInfo(accessToken);

      // 필요한 정보만 추출하여 반환
      return {
          accessToken,
          profile: {
              id: profile.id,
              email: profile.kakao_account.email,
              nickname: profile.kakao_account.profile.nickname,
              profile_image: profile.kakao_account.profile.profile_image_url
          },
      };
  } catch (error) {
      console.error('Error getting Kakao access token and profile:', error);
      throw error;
  }
};
*/

// 로그인
export const signInKakao = async (kakaoToken) => {
  const result = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
          Authorization: `Bearer ${kakaoToken}`,
      },
  });

  const {data} = result
  console.log('data:', data);
  const name = data.properties.nickname;
  const kakaoId = data.id;
  const profileImage = data.properties.profile_image;

  console.log("name: ", name, "kakaoId: ", kakaoId, "profileImage: ", profileImage);

  if (!name || !kakaoId) throw new Error("KEY_ERROR", 400);

  const user = await LoginDao.getUserById(kakaoId);

  // 첫 로그인
  if (!user) {
    console.log("!user");
    await LoginDao.signUp(kakaoId, name, profileImage);
    const getuser = await LoginDao.getUserById(kakaoId);
    return jwt.sign({ kakao_id: getuser.user_id }, process.env.TOKEN_SECRET);
  }

  return jwt.sign({ kakao_id: user.user_id }, process.env.TOKEN_SECRET);
};

/*export const getKakaoAccessToken = async (reqcode) => {
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
    const userinfo = await getUserInfo(json.access_token);
    const usercheck = await LoginDao.userCheck(userinfo.id);
    // 유저 있음
    if (usercheck) {
      await LoginDao.updateAccessToken(profile.id, accessToken);
      return { "user_id": existingUser.id };
    } else { 
      const userId = await LoginDao.userlogin();

    }
    // const usertocken = await LoginDao.userlogin(json.access_token);

    console.log('json: ', json.access_token);
    return json; // 프론트엔드에서 확인용
};*/

// 유저 정보 받기
export const getUserKakaoInfo = async (accessToken) => {
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

// 유저 정보 조회
export const getUserInfo = async (id) => {
  try {
    const getUserData = await LoginDao.getUserById(id);

    return getUserData; 
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

// 레벨테스트
export const levelTest = async (user_id, point)=>{
  try {
    console.log("유저: ", user_id); 
    console.log("point: ", point);

    const userspec = await LoginDao.levelTest(user_id, point);

    return userspec;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
