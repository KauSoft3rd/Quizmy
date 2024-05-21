import { response } from "../../src/config/response.js";
import { status } from "../../src/config/response.status.js";
import * as storeService from "../services/store.service.js";
import * as mypageService from "../services/mypage.service.js";
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