import { response } from "../../src/config/response.js";
import { status } from "../../src/config/response.status.js";
import * as storeService from "../services/store.service.js";
import * as storeDao from "../models/store.dao.js";

// 포인트 조회
export const getPoint = async (req, res) => {
    try {
        console.log("포인트 조회");
        const user_id = req.user_id;
        console.log('user_id: ', user_id);

        return res.send(response(status.SUCCESS, await storeService.getPoint(user_id)));
    } catch (error) {
        return res.send(response(status.BAD_REQUEST));
    }
}

// 아이템 구매
export const purchaseItem = async (req, res) => {
    try {
        console.log("아이템 구매");
        const user_id = req.user_id;
        console.log('user_id: ', user_id);
        console.log('req.body: ', req.body);

        return res.send(response(status.SUCCESS, await storeService.purchaseItem(user_id, req.body.costpoint, req.body.item)));
    } catch (error) {
        return res.send(response(status.BAD_REQUEST));
    }
}

// 아이템 사용
export const useItem = async (req, res) => {
    try {
        console.log("아이템 구매");
        const user_id = req.user_id;
        console.log('user_id: ', user_id);
        console.log('req.body: ', req.body);

        return res.send(response(status.SUCCESS, await storeService.useItem(user_id, req.body.item)));
    } catch (error) {
        return res.send(response(status.BAD_REQUEST));
    }
}

// 아이템 전체 조회
export const getAllItem = async (req, res) => {
    try {
        console.log("아이템 조회");
        const user_id = req.user_id;
        console.log('user_id: ', user_id);

        return res.send(response(status.SUCCESS, await storeDao.getAllItem(user_id)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST, error));
    }
}

// 티켓 조회
export const getTicket = async (req, res) => {
    try {
        console.log("티켓 조회");
        const user_id = req.user_id;
        console.log('user_id: ', user_id);

        return res.send(response(status.SUCCESS, await storeDao.getTicket(user_id)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST, error));
    }
}

// 포인트 구매
export const addPoint = async (req, res) => {
    try {
        console.log("포인트 구매");
        const user_id = req.user_id;
        console.log('user_id: ', user_id);
        console.log('req.body: ', req.body);

        return res.send(response(status.SUCCESS, await storeService.addPoint(user_id, req.body.point)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST, error));
    }
}

// 퀴즈북 최대 1개
// DB 에 quizbook 숫자가 보유하고있는 퀴즈북의 가장 높은 레벨임


// 잠금해제 되어있는건 true
// 잠금해제 안되어있는건 false
// quizbook 데이터보다 같거나 작은 레벨의 퀴즈북은 보유 중
// false인 건 살 수 없음
// true는 구매 가능
// 퀴즈북 레벨이 body로 들어왔을 때
// 1. 퀴즈북 데이터랑 비교해서 보유하고 있는건지 확인
// 2. 레벨 계산해서 true, false 넘기기(살 수 있는지 없는지)

// 퀴즈북 구매
export const purchaseBook = async (req, res) => {
    try {
        console.log("퀴즈북 구매");
        const user_id = req.user_id;
        console.log('user_id: ', user_id);
        console.log('req.body: ', req.body);

        return res.send(response(status.SUCCESS, await storeService.purchaseBook(user_id, req.body.level, req.body.cost)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST, error));
    }
}

// 보유 개수 제한


// 컬러칩 적용
export const ticketColor = async (req, res) => {
    try {
        console.log("컬러칩 적용");
        const user_id = req.user_id;
        console.log('user_id: ', user_id);
        console.log('req.body: ', req.body);

        return res.send(response(status.SUCCESS, await storeDao.ticketColor(user_id, req.body.color)));
    } catch (error) {
        console.log(error);
        return res.send(response(status.BAD_REQUEST, error));
    }
}