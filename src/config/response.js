/*

API 응답 통일

*/


// 1. 정상 수행에 대한 응답
export const response = ({ isSuccess, code, message }, result ) => {
    return {
        isSuccess: isSuccess,
        code: code,
        message: message,
        result: result
    };
};