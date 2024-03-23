import { checkUserSql, getUserspecSql, insertUserSql, insertUserinfoSql, updateAccessTokenSql } from "./login.sql.js";
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

// 유저 유무 체크
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

// 사용자 토큰 업데이트
export const updateAccessToken = async (id, accessToken) => {
    const conn = await pool.getConnection();

    const [result] = await pool.query(updateAccessTokenSql, [accessToken, id]);
    conn.release();
    return result.affectedRows; // 업데이트된 행의 수 반환
};

// 레벨 테스트
export const levelTest = async(id, point) => {
    const conn = await pool.getConnection();
    try {
        console.log('leveltestdb');
        
        const result = await conn.query(insertUserinfoSql, [
            null,
            id, 
            null,
            point,
            null, 
            null,
            null
        ]);

        conn.release();
        
        return getUserspec(id);
    } catch (error) {
        console.log(error);
        return error;
    }
}

// 유저info 조회
export const getUserspec = async(id) => {
    try {
        const conn = await pool.getConnection();

        const userspec = await conn.query(getUserspecSql, [id]);
        console.log("userspec: ", userspec[0][0]);

        conn.release();

        return userspec[0][0];
    } catch (error) {

    }
}
