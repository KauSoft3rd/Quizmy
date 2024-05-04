import axios from 'axios';
import cheerio from 'cheerio';

/*
Service 1 : 시간차이를 반환하는 서비스 / CPU 사용
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
Service 2 : 북마크에 존재하는 기사인지 확인하는 서비스 > 아직 사용되지 않음
*/


/*
Service 3 : 램덤으로 4개의 단어를 제공하는 서비스 / CPU 사용
*/

export const randomFourKeywordSelectService = (arr) => {
    try {
        const randomIndex = [];
        for (let i = 0; i < arr.length; i++) {
            if (randomIndex.length === 4) break;
            let num = Math.floor(Math.random() * arr.length);
            if (randomIndex.indexOf(num) === -1) {
                randomIndex.push(num);
            } else i--;
        }

        const result = [];
        for (let i = 0; i < randomIndex.length; i++) {
            result.push(arr[randomIndex[i]]);
        }
        return result;
    } catch ( error ) {
        return error;
    }
}

/*
Service 4 : 네이버 뉴스 표지 이미지 url추출 서비스
*/

export const getNewsImageURL = async (newsURL) => {
    try {
        const response = await axios.get(newsURL);
        const html = response.data;
        const $ = cheerio.load(html);
        const imageSrc = $('meta[property="og:image"]').attr('content');
        return imageSrc;
    } catch ( error ) {
        return error;
    }
}

/*
Service 5 : 카테고리 뉴스 시간 차이 적용
*/

export const getTimeDiff = (time) => {
    const millisecondsDiff = new Date() - new Date(time);
    const minutesDiff = Math.floor(millisecondsDiff / (1000 * 60));

    if (minutesDiff < 60) {
        return `${minutesDiff}분 전`;
    } else {
        const hoursDiff = Math.floor(minutesDiff / 60);
        return `${hoursDiff}시간 전`;
    }
}

