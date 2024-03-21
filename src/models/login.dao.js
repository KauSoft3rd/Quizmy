import { insertUserSql } from "./login.sql.js";
import { pool } from "../config/db.config.js";


// 유저 정보 등록
export const userlogin = async (accessToken, profile) => {
    try {
        const conn = await pool.getConnection();

        console.log(accessToken)

        const result = await pool.query(insertUserSql, [
            profile.id, 
            accessToken,
            new Date()
        ]);

        conn.release();

        return { "user_id": result[0].insertId };
    } catch (err) {
        throw err;
    }
}
