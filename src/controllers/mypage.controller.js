import { response } from "../../src/config/response.js";
import { status } from "../../src/config/response.status.js";
import scheduler from 'node-schedule';
import * as mypageService from "../services/mypage.service.js";
import * as mypageDao from "../models/mypage.dao.js";

// 퀴즈 위클리 정답률 조회
// 유저 아이디로 조회해서 db에 있는 유저의 grade 1 인 개수/유저의 전체단어개수 계산
// 배열 반환
export const getQuiz = async (req, res) => {
    try {
        console.log("퀴즈 정답률 조회");
        const user_id = req.user_id;
        console.log("user_id: ", user_id);

        return res.send(response(status.SUCCESS, await mypageService.getQuiz(user_id)));
    } catch (error) {
        return res.send(response(status.BAD_REQUEST));
    }
}

// 오늘 퀴즈 정답률 조회
export const getTodayQuiz = async (req, res) => {
    try {
        console.log("오늘 퀴즈 정답률 조회");
        const user_id = req.user_id;
        console.log("user_id: ", user_id);

        return res.send(response(status.SUCCESS, await mypageDao.getTodayQuiz(user_id)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}

// 오늘 퀴즈 스트릭 조회
// 유저 아이디랑 오늘 날짜 검색해서 푼 단어 있는지
// 1/0 반환
export const getStreak = async (req, res) => {
    try {
        console.log("퀴즈 스트릭 조회");
        const user_id = req.user_id;
        console.log("user_id: ", user_id);

        return res.send(response(status.SUCCESS, await mypageDao.getStreak(user_id)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}

// 위클리 스트릭 조회
export const getWeeklyStreak = async (req, res) => {
    try {
        console.log("퀴즈 위클리 스트릭 조회");
        const user_id = req.user_id;
        console.log("user_id: ", user_id);

        return res.send(response(status.SUCCESS, await mypageDao.getWeeklyStreak(user_id)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}

// 유저 레벨 조회
// 레벨은 문자열(Bronze, Silver)로 반환
// 개수로 판단 후 레벨 퍼센트 반환
export const getLevel = async (req, res) => {
    try {
        console.log("유저 레벨 조회");
        const user_id = req.user_id;
        console.log("user_id: ", user_id);

        return res.send(response(status.SUCCESS, await mypageService.getLevel(user_id)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}

// 퀴즈 카운트 증가
// 퀴즈 정답일 때 증가
export const addCountQuiz = async (req, res) => {
    try {
        console.log("퀴즈 카운트 증가");
        const user_id = req.user_id;
        console.log("user_id: ", user_id);

        return res.send(response(status.SUCCESS, await mypageService.addCountQuiz(user_id)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}

// 전체 유저 아이디 조회
export const getAllUserId = async (req, res) => {
    try {
        console.log("전체 유저 아이디 조회");

        return res.send(response(status.SUCCESS, await mypageDao.getAllUserId()));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}

// 유저 정보 갱신
export const updateUserData = async (req, res) => {
    try {
        console.log("유저 정보 갱신");

        return res.send(response(status.SUCCESS, await mypageDao.updateUserData()));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}

// 위클리 스트릭 갱신
export const updateWeeklyPercent = async (req, res) => {
    try {
        console.log("위클리 스트릭 갱신");
        const user_id = req.user_id;
        console.log("user_id: ", user_id);

        return res.send(response(status.SUCCESS, await mypageDao.updateWeeklyStreak(user_id)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}

scheduler.scheduleJob('0 0 * * *', function() {
    console.log('유저 정보 갱신');
    mypageDao.updateUserData();
});

// 퀴즈 포인트 -> todaypoint, point 둘 다 적재
// 투데이포인트 300 되면 적재 그만하기
// 본인 기준 5(본인-2), 10(본인-1), 15(본인), 20, 25
export const addQuizPoint = async (req, res) => {
    try {
        console.log("퀴즈 포인트 추가");
        const user_id = req.user_id;
        console.log("user_id: ", user_id);
        console.log("req.body.words_id: ", req.body.words_id);

        return res.send(response(status.SUCCESS, await mypageService.addQuizPoint(user_id, req.body.words_id)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST));
    }
}