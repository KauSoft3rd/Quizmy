/*
Service 1 : 시간차이를 반환하는 서비스
*/

export const calculateDate = (d1, d2) => {
    let diffTime = Math.abs(d2 - d1);
    let diffHour = diffTime / (1000 * 60 * 60);

    let timeDiff;

    if (diffHour < 1) { timeDiff = `${Math.floor(diffTime / (1000 * 60))}분`; } 
    else { timeDiff = `${Math.floor(diffHour)}시간` }
    return timeDiff;
}

/*
Service 2 : 북마크에 존재하는 기사인지 확인하는 서비스
*/

export const getBookmarkNewsDB = () => {

};

/*

*/