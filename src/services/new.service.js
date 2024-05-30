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
Service 2 : 키워드를 통해 조회한 뉴스의 시간을 반환
*/

export const keywordNewsCalculateDate = (d1, d2) => { // d1 = 뉴스 시간, d2 = 현재 시간
    const diffInMillis = d2 - d1;
    const diffInMinutes = Math.round(diffInMillis / (1000 * 60));
    const diffInHours = Math.round(diffInMinutes / 60);
    const diffInDays = Math.round(diffInHours / 24);

    let timeDiff;
    if (diffInDays > 0) timeDiff = `${diffInDays}일`;
    else if (diffInHours > 0) timeDiff = `${diffInHours}시간`
    else timeDiff = `${diffInMinutes}분`;
    return timeDiff;
}

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
        return imageSrc ? imageSrc : '';
    } catch ( error ) {
        console.error(error);
        return '';
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

/*
Service 6 : News api를 활용하여 최신 뉴스를 100개 조회
*/

export const getNewestNews = async () => {
    try {
        const pageSize = 100;
        let page = 1;
        const result = [];
        while (true) {
            const newsList = await axios.get(`https://newsapi.org/v2/top-headlines?country=kr&pageSize=${pageSize}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`);
            // const newsList = await axios.get(`https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_API_KEY}`);
            const newsData = newsList.data.articles;
            if (newsData.length === 0) break;
            newsData.forEach(item => {
                let title = item.title.replace(/<[^>]*>?/gm, '');
                title = item.title.split(' - ');
                const company = title.length > 1 ? title.pop() : 'NULL';
                result.push({
                    title: title.join(' - '), // 제목 재조합
                    company: company,
                    newsLink: item.url,
                    date: item.publishedAt,
                    img: item.urlToImage,
                });
            });
            if (newsData.length < pageSize) break;
            page++;
        }
        return result;
    } catch (error) {
        console.log(error);
    }
}
