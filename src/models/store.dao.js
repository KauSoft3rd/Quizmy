import { pool } from "../config/db.config.js"; //db
import { getUserPointSql, updateUserPointSql } from "./mypage.sql"
import { getAllItemSql, getItemSql, getPointSql, getQuizbookSql, getTicketSql, getticketColorSql, purchaseQuizbookSql, updateUserItemtSql, updateticketColorSql } from "./store.sql";

// 아이템 전체 조회
export const getAllItem = async (id) => {
    const conn = await pool.getConnection();

    const getItemData = await conn.query(getAllItemSql, [id]);

    conn.release();

    return getItemData[0][0];   
}

// 특정 아이템 개수 조회
export const getItem = async (id, item) => {
    try{
        const conn = await pool.getConnection();

        const getItemData = await conn.query(getItemSql, [item, id]);
        console.log('getItemData: ', getItemData[0][0]);
    
        conn.release();
    
        return getItemData[0][0];   
    } catch(error){
        console.log(error);
        return error;
    }

}

// 포인트 업데이트
export const updatePoint = async (id, point) => {
    const conn = await pool.getConnection();

    const updatePointData = await conn.query(updateUserPointSql, [point, id]);

    conn.release();
}

// 아이템 업데이트
export const updateItem = async (id, item, count) => {
    const conn = await pool.getConnection();

    const updateItem = await conn.query(updateUserItemtSql, [item, count, id]);

    // 아이템 조회
    const getItemData = await conn.query(getItemSql, [item, id]);

    conn.release();
    console.log('userPointData: ', getItemData[0][0]);

    return getItemData[0][0];
}

// 티켓 조회
export const getTicket = async (id) => {
    try{
        const conn = await pool.getConnection();

        const getTicketData = await conn.query(getTicketSql, [id]);
        console.log('getItemData: ', getTicketData[0][0]);
    
        conn.release();
    
        return getTicketData[0][0];   
    } catch(error){
        console.log(error);
        return error;
    }
}

// 퀴즈북 레벨 조회
export const getQuizbook = async (id) => {
    try{
        const conn = await pool.getConnection();

        const getQuizbookData = await conn.query(getQuizbookSql, [id]);
        console.log('getQuizbookData: ', getQuizbookData[0][0].quizbook);
    
        conn.release();
    
        return getQuizbookData[0][0].quizbook;   
    } catch(error){
        console.log(error);
        return error;
    }
}

// 퀴즈북 구매
export const purchaseBook = async (id) => {
    try{
        const conn = await pool.getConnection();

        await conn.query(purchaseQuizbookSql, [id]);
    
        conn.release();
    } catch(error){
        console.log(error);
        return error;
    }
}

// 컬러칩 적용
export const ticketColor = async (id, color) => {
    try{
        const conn = await pool.getConnection();

        await conn.query(updateticketColorSql, [color, id]);
    
        const colorData = await conn.query(getticketColorSql, [id]);

        conn.release();

        console.log('colorData[0][0].color: ', colorData[0][0].color);

        return colorData[0][0].color;
    } catch(error){
        console.log(error);
        return error;
    }
}
