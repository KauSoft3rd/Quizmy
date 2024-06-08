import { response } from "../../src/config/response.js";
import { status } from "../../src/config/response.status.js";
import * as homeDao from "../models/home.dao.js";
import * as mypageDao from "../models/mypage.dao.js";

//오늘의 명언 조회
export const getSaying = async (req, res) => {
    try {
        console.log("오늘의 명언 조회");

        return res.send(response(status.SUCCESS, await homeDao.getSaying()));
    } catch (error) {
        return res.send(response(status.BAD_REQUEST));
    }
}
