import { pool } from "../config/db.config.js"; //db
import { findOrderByIdSql, getOrderDetailSql, saveOrderSql, updateOrderStatusSql } from './paypal.sql.js';

// 구매 정보 저장
export const saveOrder = async (paypalOrderId, userid, paypalOrderStatus) => {
    const conn = await pool.getConnection();
    try{
        console.log('userid: ', userid);
        console.log('paypalOrderId: ', paypalOrderId);
        const [result] = await conn.query(saveOrderSql, [
            null,
            userid, 
            paypalOrderStatus, 
            new Date(),
            paypalOrderId
        ]);
        conn.release();
        console.log('result.insertId: ', result.insertId);
        return result.insertId;
    } catch (error) {
        conn.release();
        console.log(error);
        return error;
    }
};


export const updateOrderStatus = async (paypalOrderId, paypalOrderStatus) => {
    const conn = await pool.getConnection();
    try {
        await pool.query(updateOrderStatusSql, [paypalOrderStatus, paypalOrderId]);
        conn.release();
    } catch (error) {
        conn.release();
        console.log(error);
        return error;
    }
};

// 구매 정보 확인
export const findOrderById = async (paypalOrderId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(findOrderByIdSql, [paypalOrderId]);
        conn.release();
        return rows[0];
    } catch (error) {
        conn.release();
        console.log(error);
        return error;
    }
};

// 구매 상태 정보 확인
export const getOrderDetails = async (paypalOrderId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(getOrderDetailSql, [paypalOrderId]);
        conn.release();
        return rows[0];
    } catch (error) {
        conn.release();
        console.log(error);
        return error;
    }
};