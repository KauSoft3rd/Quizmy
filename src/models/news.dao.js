import { deleteBookmarkSql, getBookmarkList, postBookmarkSql } from "./news.sql";
import { pool } from "../config/db.config.js"; //db

export const getBookmarkNewsDB = async (user_id) => {
    try {
        const db = await pool.getConnection();
        const [bookmarkGroup] = await db.query(getBookmarkList, [user_id]);
        db.release();
        return bookmarkGroup;
    } catch (error) {
        return error;
    }
};

export const postBookmarkDao = async (user_id, link) => {
    try {
        const db = await pool.getConnection(); // db와 연결
        await db.query(postBookmarkSql, [user_id, link]); // 데이터 삽입 쿼리 수행
        db.release(); // 연결 끊기
    } catch ( error ) { 
        return error;
    }
};

export const deleteBookmarkDao = async (user_id, link) => {
    try {
        const db = await pool.getConnection();
        await db.query(deleteBookmarkSql, [user_id, link]);
        db.release();
    } catch ( error ) {
        return error;
    }
}