import { response } from "../../src/config/response.js";
import { status } from "../../src/config/response.status.js";
import { BaseError } from "../config/error.js";
import * as storeDao from "../models/store.dao.js";
import * as mypageDao from "../models/mypage.dao.js";
import * as mypageService from "../services/mypage.service.js";


// 포인트 조회
export const getPoint = async (id) => {
    try{
        const currentPointData = await mypageDao.getPoint(id);

        return currentPointData;
    } catch (error) {
        throw error;
    }
}


// 아이템 구매
// 아이템 개수 늘리기
// 포인트 줄이기
export const purchaseItem = async (id, cost, item) => {
    try{
        // 포인트 조회
        const currentPointData = await mypageDao.getPoint(id);
        console.log("currentPointData: ", currentPointData);

        // 포인트 확인 - cost가 포인트보다 크면 오류
        if (currentPointData < cost) return new BaseError(status.POINT_LACK);

        // 포인트 줄이기
        const newPointData = currentPointData - cost;
        console.log('newPointData: ', newPointData);
        const updatePointData = await storeDao.updatePoint(id, newPointData);

        let getItemData = await storeDao.getItem(id, item);
        console.log('getItemData: ', getItemData);

        // 아이템 개수 늘리기
        const newCount = getItemData[item] + 1;

        const purchaseItemData = await storeDao.updateItem(id, item, newCount);
        // const purchaseItemData = await storeDao.purchaseItem(id, item);

        return purchaseItemData;
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

// 아이템 사용
export const useItem = async (id, item) => {
    try{
        // 특점 아이템 조회
        let getItemData = await storeDao.getItem(id, item);

        // 아이템 확인 아이템 개수 0 이면 오류
        if (getItemData[item] <= 0) return new BaseError(status.ITEM_LACK);

        const newCount = getItemData[item] - 1;

        // 아이템 개수 줄이기
        const subPointData = await storeDao.updateItem(id, item, newCount);

        return subPointData;
    } catch (error) {
        throw error;
    }
}


// 포인트 증가(포인트 구매)
// point = 증가할 포인트
export const addPoint = async (id, point) => {
    try {  
        // 현재 포인트 조회
        const getCurrenttData = await mypageDao.getPoint(id);

        // 더한 포인트 
        const newPointData = getCurrenttData + point;

        // 포인트 값 먼저 바꾸고
        const addPointData = await storeDao.updatePoint(id, newPointData);

        const currentPointData = await mypageDao.getPoint(id);

        return currentPointData;

    } catch (error){
        throw error;
    }
}

// 포인트 감소
export const subPoint = async (id) => {
    
}

