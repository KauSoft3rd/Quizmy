import { response } from "../../src/config/response.js";
import { status } from "../../src/config/response.status.js";
import { BaseError } from "../config/error.js";
import * as storeDao from "../models/store.dao.js";
import * as mypageDao from "../models/mypage.dao.js";

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
        console.log("id: ", id, "point: ", point);
        // 현재 포인트 조회
        const getCurrenttData = await mypageDao.getPoint(id);

        // 더한 포인트 
        const newPointData = getCurrenttData + point;

        console.log('newPointData: ', newPointData);

        // 포인트 값 먼저 바꾸고
        const addPointData = await storeDao.updatePoint(id, newPointData);

        const currentPointData = await mypageDao.getPoint(id);

        return currentPointData;
    } catch (error){
        throw error;
    }
}

// 퀴즈북 구매
export const purchaseBook = async (id, level, cost) => {
    try {
        // 포인트 조회
        const currentPointData = await mypageDao.getPoint(id);
        console.log("currentPointData: ", currentPointData);

        // 포인트 확인 - cost가 포인트보다 크면 오류
        if (currentPointData < cost) return new BaseError(status.POINT_LACK);
        else {
            // 본인 레벨 조회
            const getUserLevelData = await mypageDao.getLevel(id);

            const diff = level - getUserLevelData

            if (diff > 2) {
                return new BaseError(status.BOOK_LEVEL);
            }
            else {
                // 지금 보유 중인 퀴즈북 레벨조회
                const userQuizbookData = await storeDao.getQuizbook(id);
                const bookdiff = level - userQuizbookData;
                if (bookdiff == 1) {
                    // 퀴즈북 구매
                    await storeDao.purchaseBook(id);
                    const newUserQuizbookData = await storeDao.getQuizbook(id);

                    // 포인트 줄이기
                    const newPointData = currentPointData - cost;
                    console.log('newPointData: ', newPointData);
                    const updatePointData = await storeDao.updatePoint(id, newPointData);

                    return newUserQuizbookData;
                }
                else if (bookdiff == 2) {
                    return new BaseError(status.BOOK_LEVEL_LACK);
                }
                else {
                    return new BaseError(status.BOOK_ALREADY);
                }
            }
        }
    } catch (error){
        throw error;
    }
}

// 잠금해제 되어있는건 true
// 잠금해제 안되어있는건 false
// quizbook 데이터보다 같거나 작은 레벨의 퀴즈북은 보유 중
// false인 건 살 수 없음
// true는 구매 가능
// 퀴즈북 레벨이 body로 들어왔을 때
// 0. 본인 레벨 
// 1. 퀴즈북 데이터랑 비교해서 보유하고 있는건지 확인
// 2. 레벨 계산해서 true, false 넘기기(살 수 있는지 없는지)
