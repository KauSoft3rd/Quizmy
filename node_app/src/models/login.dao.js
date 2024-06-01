import { checkUserIdSql, checkUserInfoSql, checkUserSql, getUserspecSql, insertUserItemSql, insertUserSql, insertUserinfoSql, updateAccessTokenSql } from "./login.sql.js";
import { pool } from "../config/db.config.js"; //db


// 유저 정보 등록
/*export const userlogin = async (accessToken, profile) => {
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
}*/

// 유저 조회
export const getUserById = async (id) => {
    const conn = await pool.getConnection();
    const getUser = await conn.query(checkUserSql, [id]);

    console.log('getUser: ', getUser[0][0]);
    conn.release();
    return getUser[0][0];
}

// 유저 정보 등록
export const signUp = async (kakao_id) => {
    const conn = await pool.getConnection();
    const insertUser = await pool.query(insertUserSql, [
        null,
        new Date(),
        kakao_id
    ])
    conn.release();
}

// 유저 유무 체크
export const userCheck = async (id) => {
    // db에서 유저아이디 있는지 찾기
    const conn = await pool.getConnection();
    
    try {
        // 해당 ID를 가진 유저가 있는지 검색
        const [rows] = await conn.query(checkUserSql, [id]);
        
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

// 레벨 테스트
export const levelTest = async(id, point) => {
    const conn = await pool.getConnection();
    try {
        console.log('leveltestdb');
        
        const result = await conn.query(insertUserinfoSql, [
            null,
            id, 
            point,
            0,
            JSON.stringify([0,0,0,0,0]), 
            0,
            0,
            1,
            JSON.stringify([0,0,0,0,0]),
            0
        ]);

        const itemresult = await conn.query(insertUserItemSql, [
            null,
            id,
            0, // 스트릭
            0, // 뽑기 티켓
            1 // 레벨북
        ])

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

        conn.release();

        return userspec[0][0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// 유저 확인
export const checkUserId = async(id) => {
    try {
        const conn = await pool.getConnection();

        const checkUserIdData = await conn.query(checkUserIdSql, [id]);

        conn.release();

        return checkUserIdData[0][0];
    } catch (error) {
        console.log(error);
        throw error;
    }
}