import { StatusCodes } from 'http-status-codes';

export const status = {
    // 응답 성공
    SUCCESS: {
        status: StatusCodes.OK,
        isSuccess: true,
        code: 200,
        message: "SUCCESS"
    },

    INTERNAL_SERVER_ERROR: {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        isSuccess: false,
        code: 500,
        message: "내부 서버에 문제가 있습니다."
    },

    // 잘못된 요청
    BAD_REQUEST: {
        status: StatusCodes.BAD_REQUEST,
        isSuccess: false,
        code: 504,
        message: "잘못된 요청입니다"
    },

    NOT_FOUND: {
        status: StatusCodes.NOT_FOUND,
        isSuccess: false,
        code: 404,
        message: "해당 페이지를 찾을 수 없습니다."
    },

    UNAUTHORIZED: {
        status: StatusCodes.UNAUTHORIZED,
        isSuccess: false,
        code: 400,
        message: "권한이 없습니다."
    }
};