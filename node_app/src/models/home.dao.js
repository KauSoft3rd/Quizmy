import { pool } from "../config/db.config.js"; //db
import { BaseError } from "../config/error.js";
import { status } from "../../src/config/response.status.js";
import { getSayingContentSql } from "./home.sql.js";

// 오늘의 명언 조회
export const getSaying = async () => {
    try {
        const conn = await pool.getConnection(); 
        const [saying] = await conn.query(getSayingContentSql);
        console.log(saying);
        conn.release();

        if (!saying || !saying.length) {
            throw new BaseError(status.QUESTION_NOT_FOUND);
        };

        return saying[0];
    } catch (err) {
        throw err;
    }
};