import { checkUserSql, insertUserSql, updateAccessTokenSql } from "./login.sql.js";
import { pool } from "../config/db.config.js"; //db


// 유저 정보 등록
export const userlogin = async (accessToken, profile) => {
    try {
        const conn = await pool.getConnection(); //db

        console.log(accessToken)

        const result = await pool.query(insertUserSql, [
            profile.id, 
            accessToken,
            new Date()
        ]);

        conn.release(); //db
        console.log("result: ", result);

        return { "user_id": result[0].affectedRows };
    } catch (err) {
        throw err;
    }
}

export const userCheck = async (id) => {
    // db에서 유저아이디 있는지 찾기
    const conn = await pool.getConnection();
    
    try {
        // 해당 ID를 가진 유저가 있는지 검색
        const [rows, fields] = await conn.query(checkUserSql, [id]);
        
        conn.release();
        
        // 결과에 따라 boolean 반환
        return rows.length > 0;
    } catch (error) {
        console.error('Error checking user ID:', error);
        // 연결 반환
        conn.release();
        return false; // 에러가 발생한 경우 false 반환
    }
}

export const updateAccessToken = async (id, accessToken) => {
    const [result] = await pool.query(updateAccessTokenSql, [accessToken, id]);
    return result.affectedRows; // 업데이트된 행의 수 반환
};

export const levelTest = (req, res)=>{
    try {
  
    } catch (error) {
  
    }
  }