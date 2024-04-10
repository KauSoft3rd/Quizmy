// 임의의 단어 하나를 반환하는 서비스
export const randomSelectService = (arr) => {
    try {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    } catch ( error ) {
        return error;
    }
}