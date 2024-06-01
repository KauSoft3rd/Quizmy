export const randomSelectService = (arr) => {
    try {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    } catch ( error ) {
        return error;
    }
}