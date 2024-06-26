import { StatusCodes } from 'http-status-codes';

export const status = {
    // success
    SUCCESS: {status: StatusCodes.OK, isSuccess: true, code: "200", message: "success!"},    

    // error
    // common err
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, isSuccess: false, code: "COMMON000", message: "서버 에러, 관리자에게 문의 바랍니다." },
    BAD_REQUEST: {status: StatusCodes.BAD_REQUEST, isSuccess: false, code: "COMMON001", message: "잘못된 요청입니다." },
    UNAUTHORIZED: {status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: "COMMON002", message: "권한이 잘못되었습니다." },
    METHOD_NOT_ALLOWED: {status: StatusCodes.METHOD_NOT_ALLOWED, isSuccess: false, code: "COMMON003", message: "지원하지 않는 Http Method 입니다." },
    FORBIDDEN: {status: StatusCodes.FORBIDDEN, isSuccess: false, code: "COMMON004", message: "금지된 요청입니다." }, 
    NOT_FOUND: {status: StatusCodes.NOT_FOUND, isSuccess: false, code: 'COMMON005', message: "해당 페이지를 찾을 수 없습니다." },

    // 로그인 err
    TOKEN_TIMEOUT: {status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: 'USER000', message: "유효하지 않은 토큰입니다." },

    // 상점 err
    POINT_LACK: {status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: 'STORE000', message: "포인트가 부족합니다." },
    ITEM_LACK: {status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: 'STORE001', message: "보유하고있지 않습니다." },
    ITEM_OVER: {status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: 'STORE002', message: "보유할 수 있는 최대로 보유하고 있습니다." },
    BOOK_LEVEL: {status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: 'STORE003', message: "잠금해제되지 않은 퀴즈북입니다." },
    BOOK_LEVEL_LACK: {status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: 'STORE003', message: "이전 레벨 퀴즈북부터 구매해야합니다." },
    BOOK_ALREADY: {status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: 'STORE003', message: "이미 보유 중인 퀴즈북입니다." },

    // 홈 err
    QUESTION_NOT_FOUND: {status: StatusCodes.UNAUTHORIZED, isSuccess: false, code: 'HOME000', message: "오늘의 명언을 찾지 못했습니다." },
};